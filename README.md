# Library Application

Library app using reactjs, redux and nodejs

Setup dev environment on Ubuntu 16.04

### Prerequisites

- nodejs
- npm

Clone project to the workspace

git clone git@github.com:dilruwan/LibraryApp.git

### Setup Frontend

#### Configuration

1. Generate client/src/conf.yml by using client/src/conf.yml.dist (conf.yml is gitignored)

2. cd LibraryApp/client
3. npm install
4. npm start

Client is running at http://localhost:8080

### Setup Backend

#### Configuration

1. Create mysql database and update src/config/config.json accordingly
2. Generate server/.env by using server/.env.dist (.env is gitignored)

3. cd LibraryApp/server
3. npm install

5. Run database migrations

- sequelize db:migrate
(This will require sequelize is installed globally or use locally https://github.com/sequelize/cli )

6. Add test data : Run seeders

There are two seeder files one for adding user account and another one for adding sample books.

Run all seeders

- sequelize db:seed:all

It will generate user account with following credentials
- username = admin
- password = abc123

If you need only specific seeder,

- sequelize db:seed --seed 20180509044400-user_seeder
- sequelize db:seed --seed 20180514035929-books_seeder

Undo seeder

- sequelize db:seed:undo:all
OR
- sequelize db:seed:undo --seed 20180509044400-user_seeder
- sequelize db:seed:undo --seed 20180514035929-books_seeder

Server is running at http://localhost:8000

On the browser point out http://localhost:8080


### Usage of tools

##### Client side

- CSS framework : Bootstrap
- Bundling tool : webpack

##### Backend

- Database: mysql
- ORM tool : Sequelize
- Authentication & authorization : bcrypt & jsonwebtoken
