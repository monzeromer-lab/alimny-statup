const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, "", {
	dialect: 'mysql',
	host: process.env.DATABASE_HOST
});

module.exports = database;