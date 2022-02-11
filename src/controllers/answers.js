const answersServices = require('../services/answers.services');

exports.getAnswers = async (req,res,next) => {
	try {
		const answerss = await answersServices.getAllAnswers(req.params.practiceTestId);
		res.status(200).json({ success:true, data: answerss })
	}catch(error) {
		console.log(error)
	}
}

exports.getAnswer = async (req,res,next) => {
	try {
		const answers = await answersServices.getAnswers(req.params.id);
		res.status(200).json({ success:true, data: answers })
	}catch(error) {
		console.log(error)
	}
}

exports.createAnswers = async (req,res,next) => {
	try {
		req.body.practiceTestId = req.params.id
		const answers = await answersServices.store(req.body);
		res.status(200).json({ success:true, data: answers })
	}catch(error) {
		console.log(error)
	}
}


exports.updateAnswers = async (req,res,next) => {
	try {
		const answers = await answersServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: answers })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteAnswers = async (req,res,next) => {
	try {
		await answersServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}