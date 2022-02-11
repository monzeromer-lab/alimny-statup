const {body , validationResult} = require('express-validator');

// lectureFile validation rules
exports.lectureFileValidationRules = () => {
	return [
		body('name','Name is required').isLength({min:3})
	];
};


// check if there're errors
exports.lectureFileValidate = (req,res,next) => {
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