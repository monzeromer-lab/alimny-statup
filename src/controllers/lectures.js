const lectureServices = require('../services/lecture.services');


exports.getLectures = async (req,res,next) => {
	try {
		const lectures = await lectureServices.getLectures(req.params.sectionId);
		res.status(200).json({ success:true, data: lectures })
	}catch(error) {
		console.log(error)
	}
}

exports.getLecture = async (req,res,next) => {
	try {
		const lecture = await lectureServices.getLecture(req.params.id);
		res.status(200).json({ success:true, data: lecture })
	}catch(error) {
		console.log(error)
	}
}

exports.createLecture = async (req,res,next) => {
	try {
		const lecture = await lectureServices.store(req.body);
		res.status(200).json({ success:true, data: lecture })
	}catch(error) {
		console.log(error)
	}
}

exports.lectureVideo = async (req,res,next) => {
	try {
		const lectures = await lectureServices.update(req.params.courseId,{video:req.file.filename})
		res.status(200).json({success:true})
	}catch(error) {
		console.log(error)
	}
}


exports.updateLecture = async (req,res,next) => {
	try {
		const lecture = await lectureServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: lecture })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteLecture = async (req,res,next) => {
	try {
		await lectureServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}