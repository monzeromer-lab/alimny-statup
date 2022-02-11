const {body , validationResult} = require('express-validator');

// lecture validation rules
exports.lectureValidationRules = () => {
	return [
		body('title','Name should be at least 3 charctor').isLength({min:3}).isString(),
		body('description','Description should be at least 10 charctor').isLength({min:10}).isString()
	];
};


// check if there're errors
exports.lectureValidate = (req,res,next) => {
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