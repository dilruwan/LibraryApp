// Book model
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        uid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        author: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        first_published_year: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING(100),
            defaultValue: ''
        },
        book_type: {
            type: DataTypes.STRING(100),
            defaultValue: ''
        },
    });
    Book.associate = (models) => {
        // associations can be defined here
    };
    return Book;
};