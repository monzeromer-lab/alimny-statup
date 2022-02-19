const couponServices = require('../services/coupon.services');
const asyncHandler = require('../middleware/async')

exports.getCoupons = asyncHandler(async (req, res, next) => {
	const coupons = await couponServices.getCoupons(req.params.courseId);
	res.status(200).json({
		success: true,
		data: coupons
	})
});

exports.getCoupon = asyncHandler(async (req, res, next) => {
	const Coupon = await couponServices.getCoupon(req.params.id);
	res.status(200).json({
		success: true,
		data: Coupon
	})
});

exports.createCoupon = asyncHandler(async (req, res, next) => {
	req.body.courseId = req.params.courseId
	const coupon = await couponServices.store(req.body);
	res.status(200).json({
		success: true,
		data: coupon
	})
});

exports.updateCoupon = asyncHandler(async (req, res, next) => {
	const coupon = await couponServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: coupon
	})
});

exports.deleteCoupon = asyncHandler(async (req, res, next) => {
	await couponServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});