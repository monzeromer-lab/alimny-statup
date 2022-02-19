const Sequelize = require('sequelize');
const database = require('../config/database');

const Course = require('./4-course')

const Section = database.define('sections', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
	}
});

Course.hasMany(Section);
Section.belongsTo(Course, {
	foreignKey: {
		allowNull: false
	}
})

module.exports = Section;