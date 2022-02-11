const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');
const Question = require('./918-question');

const Answer = database.define('answer', {
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
	mediaPath: {
		type: Sequelize.STRING,
		allowNull:true
	}
});

Answer.belongsTo(User);
Answer.belongsTo(Question);

module.exports = Answer;