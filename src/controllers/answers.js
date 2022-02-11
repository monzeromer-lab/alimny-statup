const answersServices = require('../services/answers.services');
const asyncHandler = require('../middleware/async')

exports.getAnswers = asyncHandler(async (req,res,next) => {
	const answerss = await answersServices.getAllAnswers(req.params.practiceTestId);
	res.status(200).json({ success:true, data: answerss })
});

exports.getAnswer = asyncHandler(async (req,res,next) => {
	const answers = await answersServices.getAnswers(req.params.id);
	res.status(200).json({ success:true, data: answers })
});

exports.createAnswers = asyncHandler(async (req,res,next) => {
	req.body.practiceTestId = req.params.id
	const answers = await answersServices.store(req.body);
	res.status(200).json({ success:true, data: answers })
});


exports.updateAnswers = asyncHandler(async (req,res,next) => {
	const answers = await answersServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: answers })
});

exports.deleteAnswers = asyncHandler(async (req,res,next) => {	
	await answersServices.delete(req.params.id);
	res.status(200).json({ success:true })
});