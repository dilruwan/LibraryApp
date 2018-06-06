const bcrypt = require('bcrypt');
const Promise = require("bluebird");
const uuidv1 = require('uuid/v1');

const password = "abc123";
const saltRounds = 10;

/**
 * This seeder will be created user account as username : admin, password : abc123 
 */
module.exports = {
    up: (queryInterface, Sequelize) =>
        new Promise((resolve, reject) => {
            return bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    return reject("Error");
                }

                let uid = uuidv1();

                queryInterface.bulkInsert('Users', [{
                    uid: uid,
                    name: 'Admin',
                    username: 'admin',
                    password: hash,
                    email: 'admin@example.com',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});

                resolve();
            });
        }),
    down: (queryInterface, Sequelize) => 
        queryInterface.bulkDelete('Users', [{
            username: 'admin'
        }])
};