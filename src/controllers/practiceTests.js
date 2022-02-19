const practiceTestServices = require('../services/practiceTest.services');
const asyncHandler = require('../middleware/async')

exports.getPracticeTests = asyncHandler(async (req, res, next) => {
	const practiceTests = await practiceTestServices.getPracticeTests(req.params.lectureId);
	res.status(200).json({
		success: true,
		data: practiceTests
	})
});

exports.getPracticeTest = asyncHandler(async (req, res, next) => {
	const practiceTest = await practiceTestServices.getPracticeTest(req.params.id);
	res.status(200).json({
		success: true,
		data: practiceTest
	})
});

exports.createPracticeTest = asyncHandler(async (req, res, next) => {
	req.body.lectureId = req.params.lectureId
	const practiceTest = await practiceTestServices.store(req.body);
	res.status(200).json({
		success: true,
		data: practiceTest
	})
});

exports.updatePracticeTest = asyncHandler(async (req, res, next) => {
	const practiceTest = await practiceTestServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: practiceTest
	})
});

exports.deletePracticeTest = asyncHandler(async (req, res, next) => {
	await practiceTestServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});