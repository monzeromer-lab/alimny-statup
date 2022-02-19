const express = require('express');
const {
	getCoupons,
	getCoupon,
	createCoupon,
	updateCoupon,
	deleteCoupon
} = require('../controllers/coupons')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	couponValidationRules,
	couponValidate
} = require('../validation/coupon');

const router = express.Router();

router.use(protect)

router.get('/:courseId', authorize('user', 'admin'), getCoupons);

router.get('/single/:id', authorize('user', 'admin'), getCoupon);

router.post('/create/:courseId', authorize('user', 'admin'), couponValidationRules(), couponValidate, createCoupon);

router.put('/update/:id', authorize('user', 'admin'), couponValidationRules(), couponValidate, updateCoupon);

router.delete('/delete/:id', authorize('user', 'admin'), deleteCoupon);


module.exports = router