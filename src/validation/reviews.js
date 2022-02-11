const {body , validationResult} = require('express-validator');

// review validation rules
exports.reviewValidationRules = () => {
	return [
		body('rating','rating should be a number').isNumeric(),
		body('feedback','feedback should be a string').isString()
	];
};


// check if there're errors
exports.reviewValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.status(400).json({
		success:false,
		errors: errors.array()
	})
}