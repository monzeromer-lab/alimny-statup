const Sequelize = require('sequelize');
const database = require('../config/database');

const PracticeTest = require('./915-practiceTest');

const Answers = database.define('practiceAnswers', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	answer: {
		type: Sequelize.STRING,
		allowNull:false
	},
	answerNumber: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
});

Answers.belongsTo(PracticeTest);


module.exports = Answers;