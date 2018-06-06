const fs = require('fs');
const Book = require('../models').Book;
const response = require('../errors/response');
const uuidv1 = require('uuid/v1');
const YAML = require('js-yaml');
const bookMeta = YAML.load(fs.readFileSync(__dirname + '/../../../common/models/book.yml'), 'utf8');
const validator = require('../utils/validator');

/**
 * Books Controller
 */
module.exports = {
    create(req, res) {
        let uid = uuidv1();
        let data = {
            uid: uid,
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            first_published_year: req.body.first_published_year,
            publisher: req.body.publisher,
            book_type: req.body.book_type
        };

        let errors = validator.validate(bookMeta, data);
        if (errors.length) {
            return res.status(400).send(
                response.error(400, errors)
            );
        }

        let currentYear = new Date().getFullYear();
        if (currentYear < parseInt(data.first_published_year)) {
            return res.status(400).send(
                response.error(400, 'First published year should not be greater than current year')
            );
        }

        return Book
            .create(data)
            .then((book) => res.status(201).send(
                response.success(201, book, 'Book was added successfully')
            ))
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },

    list(req, res) {
        const limit = 10;
        const currentPage = req.query.page;
        const offset = (currentPage - 1) * limit;

        return Book.count().then(count => {
            return Book.findAll({
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: offset,
                limit: limit
            }).then((books) => res.status(200).send(
                response.success(200, {data: books, count: count, currentPage: currentPage})
            ))
        }).catch((error) => res.status(400).send(
            response.error(400, error)
        ));
    },

    findByUid(req, res) {
        return Book
            .find({
                where: {
                    uid: req.params.id
                }
            })
            .then((book) => {
                if (!book) {
                    return res.status(404).send(
                        response.error(404, 'Book Not Found')
                    );
                }
                return res.status(200).send(
                    response.success(200, book)
                );
            })
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },

    findById(req, res) {
        return Book
            .findById(req.params.id)
            .then((book) => {
                if (!book) {
                    return res.status(404).send(
                        response.error(404, 'Book Not Found')
                    );
                }
                return res.status(200).send(
                    response.success(200, book)
                );
            })
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },

    update(req, res) {
        return Book
            .find({
                where: {
                    uid: req.params.id
                }
            })
            .then((book) => {
                if (!book) {
                    return res.status(404).send(
                        response.error(404, 'Book Not Found')
                    );
                }

                let copy = {
                    id: book.id,
                    uid: book.uid,
                    title: req.body.title || book.title,
                    author: req.body.author || book.author,
                    isbn: req.body.isbn || book.isbn,
                    first_published_year: req.body.first_published_year || book.first_published_year,
                    publisher: req.body.publisher || book.publisher,
                    book_type: req.body.book_type || book.book_type
                };

                let errors = validator.validate(bookMeta, copy);
                if (errors.length) {
                    return res.status(400).send(
                        response.error(400, errors)
                    );
                }

                let currentYear = new Date().getFullYear();
                if (currentYear < parseInt(copy.first_published_year)) {
                    return res.status(400).send(
                        response.error(400, 'First published year should not be greater than current year')
                    );
                }

                return book
                    .update(copy)
                    .then(() => res.status(200).send(
                        response.success(200, copy, 'Book was updated successfully')
                    ))
                    .catch((error) => res.status(400).send(
                        response.error(400, error)
                    ));
            })
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },

    destroy(req, res) {
        return Book
            .find({
                where: {
                    uid: req.params.id
                }
            })
            .then(book => {
                if (!book) {
                    return res.status(400).send(
                        response.error(404, 'Book Not Found')
                    );
                }
                return book
                    .destroy()
                    .then(() => res.status(201).send(
                        response.success(201, null, 'Book was deleted successfully')
                    ))
                    .catch((error) => res.status(400).send(
                        response.error(400, error)
                    ));
            })
            .catch((error) => res.status(400).send(
                response.error(400, error)
            ));
    },
};
