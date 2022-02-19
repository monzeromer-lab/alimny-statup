const lectureFileServices = require('../services/lectureFiles.services');
const asyncHandler = require('../middleware/async')


exports.getLectureFiles = asyncHandler(async (req, res, next) => {
	const lectureFiles = await lectureFileServices.getLectureFiles(req.params.lectureId);
	res.status(200).json({
		success: true,
		data: lectureFiles
	})
});

exports.getLectureFile = asyncHandler(async (req, res, next) => {
	const lectureFile = await lectureFileServices.getLectureFile(req.params.id);
	res.status(200).json({
		success: true,
		data: lectureFile
	})
});

exports.createLectureFile = asyncHandler(async (req, res, next) => {
	req.body.LectureId = req.params.lectureId
	const lectureFile = await lectureFileServices.store(req.body);
	res.status(200).json({
		success: true,
		data: lectureFile
	})
});

exports.uploadLectureFile = asyncHandler(async (req, res, next) => {
	const lectureFile = await lectureFileServices.update(req.params.id, {
		path: req.file.filename
	});
	res.status(200).json({
		success: true,
		data: lectureFile
	})
});

exports.updateLectureFile = asyncHandler(async (req, res, next) => {
	const lectureFile = await lectureFileServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: lectureFile
	})
});

exports.deleteLectureFile = asyncHandler(async (req, res, next) => {
	await lectureFileServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});