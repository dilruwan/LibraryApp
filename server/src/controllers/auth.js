const User = require('../models').User;
const bcrypt = require('bcrypt');
const response = require('../errors/response');
const jwt = require('jsonwebtoken');

/**
 * Books Controller
 */
module.exports = {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        if (!(username && password)) {
            return res.status(400).send(
                response.error(400, 'Either username or password is not exist')
            );
        }

        return User
            .find({
                where: {
                    username: username
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(400).send(
                        response.error(400, 'Username or password invalid')
                    );
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (!isMatch) {
                        return res.status(400).send(
                            response.error(400, 'Username or password invalid')
                        );
                    }

                    let token = jwt.sign({ username: username }, process.env.JWTSECRET);
                    let newSession = {
                        username: username,
                        token: token,
                        name: user.name
                    }

                    return res.status(200).send(
                        response.success(200, newSession, 'Hello ' + user.name + ', Welcome to library system')
                    );
                })
            })
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },
    /*
     * Check JWT authentication
     */
    authenticate(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send(
                response.error(403, 'No authorization credentials sent')
            );
        }

        let authorizationHeader = req.headers.authorization;
        let authToken = authorizationHeader.replace('Bearer', '');
        authToken = authToken.trim();

        return jwt.verify(authToken, process.env.JWTSECRET, function(err, decoded) {
            if (err || !decoded) {
                return res.status(401).send(
                    response.error(401, 'Invalid token')
                );
            }

            return next(); 
        });
    },
};
