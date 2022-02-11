const studentWillLearnServices = require('../services/studentWillLearn.services');


exports.getAllStudentWillLearn = async (req,res,next) => {
	try {
		const studentWillLearns = await studentWillLearnServices.getAllStudentWillLearn(req.params.courseId);
		res.status(200).json({ success:true, data: studentWillLearns })
	}catch(error) {
		console.log(error)
	}
}

exports.getStudentWillLearn = async (req,res,next) => {
	try {
		const studentWillLearn = await studentWillLearnServices.getStudentWillLearn(req.params.id);
		res.status(200).json({ success:true, data: studentWillLearn })
	}catch(error) {
		console.log(error)
	}
}

exports.createStudentWillLearn = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		const studentWillLearn = await studentWillLearnServices.store(req.body);
		res.status(200).json({ success:true, data: studentWillLearn })
	}catch(error) {
		console.log(error)
	}
}


exports.updateStudentWillLearn = async (req,res,next) => {
	try {
		const studentWillLearn = await studentWillLearnServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: studentWillLearn })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteStudentWillLearn = async (req,res,next) => {
	try {
		await studentWillLearnServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}