const Sequelize = require('sequelize');
const database = require('../config/database');

const Course = require('./4-course')

const Review = database.define('reviews', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	feedback: {
		type: Sequelize.STRING,
		allowNull: false
	},
});

Course.hasMany(Review);
Review.belongsTo(Course, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = Review;