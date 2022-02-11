const Sequelize = require('sequelize');
const database = require('../config/database');

const Course = require('./4-course')

const Coupon = database.define('coupons', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement:true,
		allowNull: false,
		primaryKey:true
	},
	discountPer: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
	code: {
		type: Sequelize.STRING,
		allowNull:false
	},
	numberOfCoupons: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
	expires: {
		type: Sequelize.DATE,
		allowNull:false,
	}
});

Course.hasMany(Coupon);
Coupon.belongsTo(Course,{
	foreignKey: {
		allowNull:false
	}
});

module.exports = Coupon;