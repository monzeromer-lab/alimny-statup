const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');
const Course = require('./4-course');

const Subscription = database.define('subscriptions', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	active: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
});

Course.belongsToMany(User, {
	through: Subscription
});
User.belongsToMany(Course, {
	through: Subscription
});

module.exports = Subscription;