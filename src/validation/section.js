const {body , validationResult} = require('express-validator');


// section validation rules
exports.sectionValidationRules = () => {
	return [
		body('name','Name is required').isLength({min:3}),
		body('description','Description should be a string').isString()
	];
};


// check if there're errors
exports.sectionValidate = (req,res,next) => {
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
