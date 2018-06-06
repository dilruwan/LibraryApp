const Promise = require("bluebird");
const uuidv1 = require('uuid/v1');

const itemCount = 100;

/*
 * Return random string
 */
function randomString(length, isNumeric = false) {
    let text = "";
    let possible = !isNumeric ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" : "0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
        
    return text;
}

/**
 * This seeder will be created sample books
 */
module.exports = {
    up: (queryInterface, Sequelize) =>
        new Promise((resolve, reject) => {

            let books = [];

            for (let i = 0; i < itemCount; i++) {
                let uid = uuidv1();
                books.push({
                    uid: uid,
                    title: randomString(8),
                    author: randomString(6),
                    isbn: randomString(12, true),
                    first_published_year: randomString(4, true),
                    publisher: randomString(5),
                    book_type: randomString(4),
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            queryInterface.bulkInsert('Books', books, {});
            resolve();
        }),
    down: (queryInterface, Sequelize) =>
        queryInterface.bulkDelete('Books')
};