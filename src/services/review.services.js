const Review = require('../models/9-review');

module.exports = class ReviewServices {
	// get all Reviews
	static async getReviews(courseId) {
		try{
			const reviews = await Review.findAll({where:{courseId:courseId}});
			return reviews;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Review
	static async getReview(reviewId) {
		try{
			const review = await Review.findByPk(reviewId);
			if(!review) {
				console.log('no Review with that id');
				return false;
			}
			return review;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Review
	static async store(data) {
		try{
			const review = await Review.create(data);
			return review;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Review
	static async update(reviewId,data) {
		try{
			const oldReview = await Review.findByPk(reviewId)
			if(!oldReview) {
				return  false;
			}
			const updatedReview = await oldReview.update(data);
			return updatedReview;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Review
	static async delete(reviewId) {
		try{
			const review = await Review.findByPk(reviewId);
			if(!review) {
				return false;
			}
			await review.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}