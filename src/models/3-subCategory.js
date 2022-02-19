const Sequelize = require('sequelize');
const database = require('../config/database');

const Category = require('./2-category')

const SubCategory = database.define('subCategories', {
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
});

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category, {
	foreignKey: {
		allowNull: false
	}
});

module.exports = SubCategory;