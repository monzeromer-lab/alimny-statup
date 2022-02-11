const couponServices = require('../services/coupon.services');


exports.getCoupons = async (req,res,next) => {
	try {
		const coupons = await couponServices.getCoupons(req.params.courseId);
		res.status(200).json({ success:true, data: coupons })
	}catch(error) {
		console.log(error)
	}
}

exports.getCoupon = async (req,res,next) => {
	try {
		const Coupon = await couponServices.getCoupon(req.params.id);
		res.status(200).json({ success:true, data: Coupon })
	}catch(error) {
		console.log(error)
	}
}

exports.createCoupon = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		const coupon = await couponServices.store(req.body);
		res.status(200).json({ success:true, data: coupon })
	}catch(error) {
		console.log(error)
	}
}


exports.updateCoupon = async (req,res,next) => {
	try {
		const coupon = await couponServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: coupon })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteCoupon = async (req,res,next) => {
	try {
		await couponServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}