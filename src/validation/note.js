const {body , validationResult} = require('express-validator');

// note validation rules
exports.noteValidationRules = () => {
	return [
		body('note','Note is required').isLength({min:3})
	];
};


// check if there're errors
exports.noteValidate = (req,res,next) => {
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