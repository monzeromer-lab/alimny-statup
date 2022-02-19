const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');
const Course = require('./4-course');

const Question = database.define('questions', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	mediaPath: {
		type: Sequelize.STRING,
		allowNull: true
	},
	body: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

Question.belongsTo(User);
Question.belongsTo(Course);

module.exports = Question;