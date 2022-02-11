const {body , validationResult} = require('express-validator');

// socialLinks validation rules
exports.socialLinksValidationRules = () => {
	return [
		body('platform','platform is required').isLength({min:3}),
		body('link','Link is required').isString()
	];
};


// check if there're errors
exports.socialLinksValidate = (req,res,next) => {
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