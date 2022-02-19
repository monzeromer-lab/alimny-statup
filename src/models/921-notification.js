const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');

const Notification = database.define('Notifications', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	text: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
});

Notification.belongsTo(User)

Notification.sync({
	force: true
})

module.exports = Notification