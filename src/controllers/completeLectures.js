const completeLectureServices = require('../services/completeLecture.services');


exports.getCompleteLectures = async (req,res,next) => {
	try {
		const completeLectures = await completeLectureServices.getCompleteLectures(req.params.userId);
		res.status(200).json({ success:true, data: completeLectures })
	}catch(error) {
		console.log(error)
	}
}

exports.getCompleteLecture = async (req,res,next) => {
	try {
		const completeLecture = await completeLectureServices.getCompleteLecture(req.params.id);
		res.status(200).json({ success:true, data: completeLecture })
	}catch(error) {
		console.log(error)
	}
}

exports.createCompleteLecture = async (req,res,next) => {
	try {
		req.body.LectureId = req.params.lectureId
		req.body.userId = req.user.id
		const completeLecture = await completeLectureServices.store(req.body);
		res.status(200).json({ success:true, data: completeLecture })
	}catch(error) {
		console.log(error)
	}
}


exports.updateCompleteLecture = async (req,res,next) => {
	try {
		const completeLecture = await completeLectureServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: completeLecture })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteCompleteLecture = async (req,res,next) => {
	try {
		await completeLectureServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}