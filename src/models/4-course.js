const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user');
const Category = require('./2-category');
const SubCategory = require('./3-subCategory');

const Course = database.define('courses', {
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
	description: {
		type: Sequelize.TEXT,
		allowNull:false
	},
	cover: {
		type: Sequelize.STRING,
	},
	intro: {
		type: Sequelize.STRING,
	},
	level: {
		type: Sequelize.ENUM('Beginner','Intermediate','Advanced','All levels'),
		allowNull:false
	},
	status: {
		type: Sequelize.ENUM('published','not published'),
		allowNull:false,
		defaultValue:'not published'
	},
	type: {
		type: Sequelize.ENUM('free','paid'),
		allowNull:false,
		defaultValue:'paid'
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull:false
	},
	badge: {
		type: Sequelize.STRING,
	},
	congratulate_msg: {
		type: Sequelize.STRING,
	},
	salute_msg: {
		type: Sequelize.STRING,
	},
});


User.hasMany(Course);
Course.belongsTo(User,{
	foreignKey: {
		allowNull:false
	}
});
Course.belongsTo(Category,{
	foreignKey: {
		allowNull:false
	}
});
Course.belongsTo(SubCategory,{
	foreignKey: {
		allowNull:false
	}
});

module.exports = Course;