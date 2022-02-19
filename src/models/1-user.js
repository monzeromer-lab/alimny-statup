const crypto = require('crypto');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const database = require('../config/database');

const User = database.define('users', {
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
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	phone: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	bio: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	income: {
		type: Sequelize.STRING,
		allowNull: true
	},
	role: {
		type: Sequelize.ENUM('user', 'admin'),
		defaultValue: 'user'
	},
	status: {
		type: Sequelize.ENUM('Pending', 'Active'),
		defaultValue: 'Pending'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	resetPasswordToken: {
		type: Sequelize.STRING,
	},
	resetPasswordExpire: {
		type: Sequelize.DATE
	},
	confirmationCode: {
		type: Sequelize.STRING,
	},

});

User.prototype.getSignedJwtToken = function () {
	return jwt.sign({
		id: this.id
	}, process.env.JWT_SECRET, {
		expiresIn: "30d"
	})
}

User.prototype.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}

User.prototype.getResetPasswordToken = async function () {
	// Genrate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash token and set it to resetPassword field
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	// set expires
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
}

module.exports = User;