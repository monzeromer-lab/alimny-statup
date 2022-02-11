const path = require('path');
const courseServices = require('../services/course.services');
const asyncHandler = require('../middleware/async')

exports.getCourses = asyncHandler(async (req,res,next) => {
	const courses = await courseServices.getCourses();
	res.status(200).json({ success:true, data: courses })
});

exports.getCourse = asyncHandler(async (req,res,next) => {
	const course = await courseServices.getCourse(req.params.id);
	res.status(200).json({ success:true, data: course })
});

exports.createCourse = asyncHandler(async (req,res,next) => {
	req.body.courseId = req.params.courseId
	const course = await req.user.createCourse(req.body);
	res.status(200).json({success:true,data:course})
});

exports.courseCover = asyncHandler(async (req,res,next) => {
	const course = await courseServices.update(req.params.courseId,{cover:req.file.filename})
	res.status(200).json({success:true,data:course})
});

exports.courseIntro = asyncHandler(async (req,res,next) => {
	const course = await courseServices.update(req.params.courseId,{cover:req.file.filename})
	res.status(200).json({success:true,data:course})
});

exports.updateCourse = asyncHandler(async (req,res,next) => {
	const course = await CourseServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: course })
});

exports.deleteCourse = asyncHandler(async (req,res,next) => {
	await CourseServices.delete(req.params.id);
	res.status(200).json({ success:true })
});