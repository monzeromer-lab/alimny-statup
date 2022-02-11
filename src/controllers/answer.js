const answerServices = require('../services/answer.services');


exports.getAnswers = async (req,res,next) => {
	try {
		const answers = await answerServices.getAnswers(req.params.questionId);
		res.status(200).json({ success:true, data: answers })
	}catch(error) {
		console.log(error)
	}
}

exports.getAnswer = async (req,res,next) => {
	try {
		const answer = await answerServices.getAnswer(req.params.id);
		res.status(200).json({ success:true, data: answer })
	}catch(error) {
		console.log(error)
	}
}

exports.createAnswer = async (req,res,next) => {
	try {
		req.body.questionId = req.params.questionId
		req.body.userId = req.user.id
		const answer = await answerServices.store(req.body);
		res.status(200).json({ success:true, data: answer })
	}catch(error) {
		console.log(error)
	}
}


exports.updateAnswer = async (req,res,next) => {
	try {
		const answer = await answerServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: answer })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteAnswer = async (req,res,next) => {
	try {
		await answerServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}