const Sequelize = require('sequelize');
const database = require('../config/database');

const Category = database.define('categories', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	name: {
		type: Sequelize.STRING,
		allowNull:false
	},
});


module.exports = Category;