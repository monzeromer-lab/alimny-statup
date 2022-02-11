const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('./1-user');
const Lecture = require('./910-lecture');

const Note = database.define('note', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	note: {
		type: Sequelize.STRING,
		allowNull:false
	},
});


User.hasMany(Note)
Note.belongsTo(User,{
	foreignKey:{
		allowNull:false
	}
})

Note.belongsTo(Lecture,{
	foreignKey:{
		allowNull:false
	}
})

module.exports = Note;