const practiceTestServices = require('../services/practiceTest.services');


exports.getPracticeTests = async (req,res,next) => {
	try {
		const practiceTests = await practiceTestServices.getPracticeTests(req.params.lectureId);
		res.status(200).json({ success:true, data: practiceTests })
	}catch(error) {
		console.log(error)
	}
}

exports.getPracticeTest = async (req,res,next) => {
	try {
		const practiceTest = await practiceTestServices.getPracticeTest(req.params.id);
		res.status(200).json({ success:true, data: practiceTest })
	}catch(error) {
		console.log(error)
	}
}

exports.createPracticeTest = async (req,res,next) => {
	try {
		req.body.lectureId = req.params.lectureId
		const practiceTest = await practiceTestServices.store(req.body);
		res.status(200).json({ success:true, data: practiceTest })
	}catch(error) {
		console.log(error)
	}
}


exports.updatePracticeTest = async (req,res,next) => {
	try {
		const practiceTest = await practiceTestServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: practiceTest })
	}catch(error) {
		console.log(error)
	}
}

exports.deletePracticeTest = async (req,res,next) => {
	try {
		await practiceTestServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}