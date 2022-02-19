const completeLectureServices = require('../services/completeLecture.services');
const asyncHandler = require('../middleware/async')

exports.getCompleteLectures = asyncHandler(async (req, res, next) => {
	const completeLectures = await completeLectureServices.getCompleteLectures(req.params.userId);
	res.status(200).json({
		success: true,
		data: completeLectures
	})
});

exports.getCompleteLecture = asyncHandler(async (req, res, next) => {
	const completeLecture = await completeLectureServices.getCompleteLecture(req.params.id);
	res.status(200).json({
		success: true,
		data: completeLecture
	})
});

exports.createCompleteLecture = asyncHandler(async (req, res, next) => {
	req.body.LectureId = req.params.lectureId
	req.body.userId = req.user.id
	const completeLecture = await completeLectureServices.store(req.body);
	res.status(200).json({
		success: true,
		data: completeLecture
	})
});

exports.updateCompleteLecture = asyncHandler(async (req, res, next) => {
	const completeLecture = await completeLectureServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: completeLecture
	})
});

exports.deleteCompleteLecture = asyncHandler(async (req, res, next) => {
	await completeLectureServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});