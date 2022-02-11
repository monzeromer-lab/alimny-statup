const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');
const Lecture = require('./910-lecture');

const CompleteLecture = database.define('complete_lecture', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	}
});

CompleteLecture.belongsTo(User);
CompleteLecture.belongsTo(Lecture);


module.exports = CompleteLecture;