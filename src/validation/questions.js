const {
	body,
	validationResult
} = require('express-validator');

// question validation rules
exports.questionsValidationRules = () => {
	return [
		body('title', 'title is required').isLength({
			min: 3
		}).isString(),
		body('body', 'Body is required').isLength({
			min: 3
		}).isString()
	];
};


// check if there're errors
exports.questionsValidate = (req, res, next) => {
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