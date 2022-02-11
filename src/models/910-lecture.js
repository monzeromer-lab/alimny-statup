const Sequelize = require('sequelize');
const database = require('../config/database');

const Course = require('./4-course')
const Section = require('./5-section')

const Lecture = database.define('Lectures', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	title: {
		type: Sequelize.STRING,
		allowNull:false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull:false
	},
	video: {
		type: Sequelize.STRING,
		allowNull:true
	},
});

Course.hasMany(Lecture);
Lecture.belongsTo(Course,{
	foreignKey: {
		allowNull:false
	}
});
Section.hasMany(Lecture);
Lecture.belongsTo(Section,{
	foreignKey: {
		allowNull:false
	}
});
module.exports = Lecture;