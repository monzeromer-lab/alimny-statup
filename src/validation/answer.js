const {body , validationResult} = require('express-validator');

// answer validation rules
exports.answerValidationRules = () => {
	return [
		body('answer','answer is required').isLength({min:3}).isString()
	];
};


// check if there're errors
exports.answerValidate = (req,res,next) => {
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