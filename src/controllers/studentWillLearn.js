const studentWillLearnServices = require('../services/studentWillLearn.services');
const asyncHandler = require('../middleware/async')

exports.getAllStudentWillLearn = asyncHandler(async (req,res,next) => {
	const studentWillLearns = await studentWillLearnServices.getAllStudentWillLearn(req.params.courseId);
	res.status(200).json({ success:true, data: studentWillLearns })
});

exports.getStudentWillLearn = asyncHandler(async (req,res,next) => {
	const studentWillLearn = await studentWillLearnServices.getStudentWillLearn(req.params.id);
	res.status(200).json({ success:true, data: studentWillLearn })
});

exports.createStudentWillLearn = asyncHandler(async (req,res,next) => {
	req.body.courseId = req.params.courseId
	const studentWillLearn = await studentWillLearnServices.store(req.body);
	res.status(200).json({ success:true, data: studentWillLearn })
});


exports.updateStudentWillLearn = asyncHandler(async (req,res,next) => {
	const studentWillLearn = await studentWillLearnServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: studentWillLearn })
});

exports.deleteStudentWillLearn = asyncHandler(async (req,res,next) => {
	await studentWillLearnServices.delete(req.params.id);
	res.status(200).json({ success:true };
});