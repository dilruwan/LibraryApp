module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            uid: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            title: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
            isbn: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            first_published_year: {
                type: Sequelize.STRING(4),
                allowNull: false,
            },
            publisher: {
                type: Sequelize.STRING(100),
                defaultValue: ''
            },
            book_type: {
                type: Sequelize.STRING(100),
                defaultValue: ''
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        }),
    down: (queryInterface, Sequelize) => 
        queryInterface.dropTable('Books')
};