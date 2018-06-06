const booksController = require('../controllers').books;
const authController = require('../controllers').auth;

module.exports = (app) => {
    app.get('/', (req, res) => res.status(200).send({
        message: 'Welcome to Library App',
    }));

    app.post('/books', authController.authenticate, booksController.create);
    app.get('/books', authController.authenticate, booksController.list);
    app.get('/books/:id', authController.authenticate, booksController.findByUid);
    app.put('/books/:id', authController.authenticate, booksController.update);
    app.delete('/books/:id', authController.authenticate, booksController.destroy);

    app.post('/session', authController.login);
};