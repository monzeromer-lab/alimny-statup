const {
	body,
	validationResult
} = require('express-validator');
const subCategory = require('../models/3-subCategory');


// subCategory validation rules
exports.subCategoryValidationRules = () => {
	return [
		body('name', 'Name is required').isLength({
			min: 3
		})
	];
};


// check if there're errors
exports.subCategoryValidate = (req, res, next) => {
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