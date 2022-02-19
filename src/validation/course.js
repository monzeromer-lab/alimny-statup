const {
	body,
	validationResult
} = require('express-validator');
const Course = require('../models/4-course');


// Course validation rules
exports.courseValidationRules = () => {
	return [
		body('name', 'Name is required').isLength({
			min: 3
		}),
		body('description', 'description should be at least 10 charactors').isLength({
			min: 10
		}),
		body('price', "price is required.").isLength({
			min: 3
		})
	];
};


// check if there're errors
exports.courseValidate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.status(400).json({
		success: false,
		errors: errors.array()
	})
}