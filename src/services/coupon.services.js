const Coupon = require('../models/6-coupon');

module.exports = class CouponServices {
	// get all Coupons
	static async getCoupons(courseId) {
		try {
			const coupons = await Coupon.findAll({
				where: {
					courseId: courseId
				}
			});
			return coupons;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single Coupon
	static async getCoupon(couponId) {
		try {
			const coupon = await Coupon.findByPk(couponId);
			if (!coupon) {
				console.log('no Coupon with that id');
				return false;
			}
			return coupon;
		} catch (error) {
			console.log(error);
		}
	}

	//store a Coupon
	static async store(data) {
		try {
			const coupon = await Coupon.create(data);
			return coupon;
		} catch (error) {
			console.log(error);
		}
	}

	// update a Coupon
	static async update(couponId, data) {
		try {
			const oldCoupon = await Coupon.findByPk(couponId)
			if (!oldCoupon) {
				return false;
			}
			const updatedCoupon = await oldCoupon.update(data);
			return updatedCoupon;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a Coupon
	static async delete(couponId) {
		try {
			const coupon = await Coupon.findByPk(couponId);
			if (!coupon) {
				return false;
			}
			await coupon.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}