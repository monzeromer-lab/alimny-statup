const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-User');

const SocialLinks = database.define('social_links', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	platform: {
		type: Sequelize.ENUM('Facebook','Linkedin','Twitter','Personal Website'),
		allowNull:false
	},
	link: {
		type: Sequelize.STRING,
		allowNull:false
	},
});

SocialLinks.belongsTo(User);

module.exports = SocialLinks;