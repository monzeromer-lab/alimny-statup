const Sequelize = require('sequelize');
const database = require('../config/database');

const Lecture = require('./910-lecture');

const LectureFiles = database.define('lectureFiles', {
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
	path: {
		type: Sequelize.STRING
	}
});

LectureFiles.belongsTo(Lecture, {
	foreignKey: {
		allowNull: false
	}
})
Lecture.hasMany(LectureFiles)

module.exports = LectureFiles;