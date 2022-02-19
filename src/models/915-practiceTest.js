const Sequelize = require('sequelize');
const database = require('../config/database');

const Lecture = require('./910-lecture');

const PracticeTest = database.define('practice_test', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	question: {
		type: Sequelize.STRING,
		allowNull: false
	},
	correctAnswer: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
});

PracticeTest.belongsTo(Lecture);

module.exports = PracticeTest;