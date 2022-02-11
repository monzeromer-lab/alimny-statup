const {body , validationResult} = require('express-validator');

// coupon validation rules
exports.couponValidationRules = () => {
	return [
		body('code','Coupon code should be at least 7 charactors').isLength({min:7}),
		body('discountPer',"Discount per should be integer").isNumeric(),
		body('expires',"please add a valid date").isDate(),
	];
};


// check if there're errors
exports.couponValidate = (req,res,next) => {
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