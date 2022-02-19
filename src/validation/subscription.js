const {
	body,
	validationResult
} = require('express-validator');

// notification validation rules
exports.notificationValidationRules = () => {
	return [
		body('text', 'text is required').isLength({
			min: 3
		}).isString()
	];
};


// check if there're errors
exports.notificationValidate = (req, res, next) => {
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