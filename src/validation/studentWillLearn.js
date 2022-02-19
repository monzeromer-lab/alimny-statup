const {
	body,
	validationResult
} = require('express-validator');

// studnetWillLearn validation rules
exports.studentWillLearnValidationRules = () => {
	return [
		body('body', 'body is required').isLength({
			min: 10
		})
	];
};


// check if there're errors
exports.studentWillLearnValidate = (req, res, next) => {
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