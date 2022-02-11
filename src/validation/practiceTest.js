const {body , validationResult} = require('express-validator');

// practiceTest validation rules
exports.practiceTestValidationRules = () => {
	return [
		body('question','Question is required').isLength({min:3}),
		body('correctAnswer','Correct answers is required').isNumeric()
	];
};


// check if there're errors
exports.practiceTestValidate = (req,res,next) => {
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