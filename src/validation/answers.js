const {body , validationResult} = require('express-validator');

// answers validation rules
exports.answersValidationRules = () => {
	return [
		body('answer','answer is required').isLength({min:3}),
		body('answerNumber','answer number is required').isNumeric()
	];
};


// check if there're errors
exports.answersValidate = (req,res,next) => {
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