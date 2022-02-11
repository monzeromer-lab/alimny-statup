const courseServices = require('../services/course.services');
const path = require('path');

exports.getCourses = async (req,res,next) => {
	try {
		const courses = await courseServices.getCourses();
		res.status(200).json({ success:true, data: courses })
	}catch(error) {
		console.log(error)
	}
}

exports.getCourse = async (req,res,next) => {
	try {
		const course = await courseServices.getCourse(req.params.id);
		res.status(200).json({ success:true, data: course })
	}catch(error) {
		console.log(error)
	}
}

exports.createCourse = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		const course = await req.user.createCourse(req.body);
		res.status(200).json({success:true,data:course})

	}catch(error) {
		console.log(error)
	}
}

exports.courseCover = async (req,res,next) => {
	try {
		const course = await courseServices.update(req.params.courseId,{cover:req.file.filename})
		res.status(200).json({success:true,data:course})
	}catch(error) {
		console.log(error)
	}
}

exports.courseIntro = async (req,res,next) => {
	try {
		const course = await courseServices.update(req.params.courseId,{cover:req.file.filename})
		res.status(200).json({success:true,data:course})
	}catch(error) {
		console.log(error)
	}
}
exports.updateCourse = async (req,res,next) => {
	try {
		const course = await CourseServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: course })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteCourse = async (req,res,next) => {
	try {
		await CourseServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}