const Sequelize = require('sequelize');
const database = require('../config/database');

const Course  = require('./4-course')

const StudentWillLearn = database.define('studentWillLearn', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	body: {
		type: Sequelize.TEXT,
		allowNull:false
	},
});

StudentWillLearn.belongsTo(Course)

module.exports = StudentWillLearn;