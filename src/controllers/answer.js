const answerServices = require('../services/answer.services');
const asyncHandler = require('../middleware/async')

exports.getAnswers = asyncHandler(async (req, res, next) => {
	const answers = await answerServices.getAnswers(req.params.questionId);
	res.status(200).json({
		success: true,
		data: answers
	})
});

exports.getAnswer = asyncHandler(async (req, res, next) => {
	const answer = await answerServices.getAnswer(req.params.id);
	res.status(200).json({
		success: true,
		data: answer
	})
})

exports.createAnswer = asyncHandler(async (req, res, next) => {
	req.body.questionId = req.params.questionId
	req.body.userId = req.user.id
	const answer = await answerServices.store(req.body);
	res.status(200).json({
		success: true,
		data: answer
	})
});


exports.updateAnswer = asyncHandler(async (req, res, next) => {
	const answer = await answerServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: answer
	})
});

exports.deleteAnswer = asyncHandler(async (req, res, next) => {
	await answerServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});