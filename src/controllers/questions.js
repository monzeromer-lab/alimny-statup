const questionServices = require('../services/question.services');
const asyncHandler = require('../middleware/async')


exports.getQuestions = asyncHandler(async (req,res,next) => {
	const questions = await questionServices.getQuestions(req.params.courseId);
	res.status(200).json({ success:true, data: questions })
});

exports.getQuestion = asyncHandler(async (req,res,next) => {
	const question = await questionServices.getQuestion(req.params.id);
	res.status(200).json({ success:true, data: question })
});

exports.createQuestion = asyncHandler(async (req,res,next) => {
	req.body.courseId = req.params.courseId
	req.body.userId = req.user.id
	const question = await questionServices.store(req.body);
	res.status(200).json({ success:true, data: question })
});


exports.updateQuestion = asyncHandler(async (req,res,next) => {
	const question = await questionServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: question })
});

exports.deleteQuestion = asyncHandler(async (req,res,next) => {
	await questionServices.delete(req.params.id);
	res.status(200).json({ success:true })
}

