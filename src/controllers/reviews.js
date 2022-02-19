const reviewServices = require('../services/review.services');
const asyncHandler = require('../middleware/async')

exports.getReviews = asyncHandler(async (req, res, next) => {
	const reviews = await reviewServices.getReviews(req.params.courseId);
	res.status(200).json({
		success: true,
		data: reviews
	})
});

exports.getReview = asyncHandler(async (req, res, next) => {
	const review = await reviewServices.getReview(req.params.id);
	res.status(200).json({
		success: true,
		data: review
	})
});

exports.createReview = asyncHandler(async (req, res, next) => {
			req.body.courseId = req.params.courseId
			const review = await reviewServices.store(req.body);
			res.status(200).json({
					success: true,
					data: review
				};
			});


		exports.updateReview = asyncHandler(async (req, res, next) => {
			const review = await reviewServices.update(req.params.id, req.body);
			res.status(200).json({
				success: true,
				data: review
			})
		});

		exports.deleteReview = asyncHandler(async (req, res, next) => {
			await reviewServices.delete(req.params.id);
			res.status(200).json({
				success: true
			})
		});