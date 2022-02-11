const sectionServices = require('../services/Section.services');
const asyncHandler = require('../middleware/async')


exports.getSections = asyncHandler(async (req,res,next) => {
	const sections = await sectionServices.getSections(req.params.courseId);
	res.status(200).json({ success:true, data: sections })
});

exports.getSection = asyncHandler(async (req,res,next) => {
	const section = await sectionServices.getSection(req.params.id);
	res.status(200).json({ success:true, data: section })
});

exports.createSection = asyncHandler(async (req,res,next) => {
	req.body.courseId = req.params.courseId;
	const section = await sectionServices.store(req.body);
	res.status(200).json({ success:true, data: section })
});


exports.updateSection = asyncHandler(async (req,res,next) => {
	const section = await sectionServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: section })
});


exports.deleteSection = asyncHandler(async (req,res,next) => {
	await sectionServices.delete(req.params.id);
	res.status(200).json({ success:true })
});