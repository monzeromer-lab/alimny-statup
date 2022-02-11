const lectureFileServices = require('../services/lectureFiles.services');


exports.getLectureFiles = async (req,res,next) => {
	try {
		const lectureFiles = await lectureFileServices.getLectureFiles(req.params.lectureId);
		res.status(200).json({ success:true, data: lectureFiles })
	}catch(error) {
		console.log(error)
	}
}

exports.getLectureFile = async (req,res,next) => {
	try {
		const lectureFile = await lectureFileServices.getLectureFile(req.params.id);
		res.status(200).json({ success:true, data: lectureFile })
	}catch(error) {
		console.log(error)
	}
}

exports.createLectureFile = async (req,res,next) => {
	try {
		req.body.LectureId = req.params.lectureId
		const lectureFile = await lectureFileServices.store(req.body);
		res.status(200).json({ success:true, data: lectureFile })
	}catch(error) {
		console.log(error)
	}
}

exports.uploadLectureFile = async (req,res,next) => {
	try {

		const lectureFile = await lectureFileServices.update(req.params.id,{path:req.file.filename});
		res.status(200).json({ success:true, data: lectureFile })
	}catch(error) {
		console.log(error)
	}
}

exports.updateLectureFile = async (req,res,next) => {
	try {
		const lectureFile = await lectureFileServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: lectureFile })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteLectureFile = async (req,res,next) => {
	try {
		await lectureFileServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}