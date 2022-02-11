const lectureServices = require('../services/lecture.services');
const asyncHandler = require('../middleware/async')

exports.getLectures = asyncHandler(async (req,res,next) => {
	const lectures = await lectureServices.getLectures(req.params.sectionId);
	res.status(200).json({ success:true, data: lectures })
});

exports.getLecture = asyncHandler(async (req,res,next) => {
	const lecture = await lectureServices.getLecture(req.params.id);
	res.status(200).json({ success:true, data: lecture })
});

exports.createLecture = asyncHandler(async (req,res,next) => {
	const lecture = await lectureServices.store(req.body);
	res.status(200).json({ success:true, data: lecture })
});

exports.lectureVideo = asyncHandler(async (req,res,next) => {
	const lectures = await lectureServices.update(req.params.courseId,{video:req.file.filename})
	res.status(200).json({success:true})
});


exports.updateLecture = asyncHandler(async (req,res,next) => {
	const lecture = await lectureServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: lecture })
});

exports.deleteLecture = asyncHandler(async (req,res,next) => {
	await lectureServices.delete(req.params.id);
	res.status(200).json({ success:true })
});