const questionServices = require('../services/question.services');


exports.getQuestions = async (req,res,next) => {
	try {
		const questions = await questionServices.getQuestions(req.params.courseId);
		res.status(200).json({ success:true, data: questions })
	}catch(error) {
		console.log(error)
	}
}

exports.getQuestion = async (req,res,next) => {
	try {
		const question = await questionServices.getQuestion(req.params.id);
		res.status(200).json({ success:true, data: question })
	}catch(error) {
		console.log(error)
	}
}

exports.createQuestion = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		req.body.userId = req.user.id
		const question = await questionServices.store(req.body);
		res.status(200).json({ success:true, data: question })
	}catch(error) {
		console.log(error)
	}
}


exports.updateQuestion = async (req,res,next) => {
	try {
		const question = await questionServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: question })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteQuestion = async (req,res,next) => {
	try {
		await questionServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}

