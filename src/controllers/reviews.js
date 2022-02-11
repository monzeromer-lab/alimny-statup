const reviewServices = require('../services/review.services');


exports.getReviews = async (req,res,next) => {
	try {
		const reviews = await reviewServices.getReviews(req.params.courseId);
		res.status(200).json({ success:true, data: reviews })
	}catch(error) {
		console.log(error)
	}
}

exports.getReview = async (req,res,next) => {
	try {
		const review = await reviewServices.getReview(req.params.id);
		res.status(200).json({ success:true, data: review })
	}catch(error) {
		console.log(error)
	}
}

exports.createReview = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		const review = await reviewServices.store(req.body);
		res.status(200).json({ success:true, data: review })
	}catch(error) {
		console.log(error)
	}
}


exports.updateReview = async (req,res,next) => {
	try {
		const review = await reviewServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: review })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteReview = async (req,res,next) => {
	try {
		await reviewServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}