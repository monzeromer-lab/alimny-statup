const SectionServices = require('../services/Section.services');


exports.getSections = async (req,res,next) => {
	try {
		const sections = await SectionServices.getSections(req.params.courseId);
		res.status(200).json({ success:true, data: sections })
	}catch(error) {
		console.log(error)
	}
}

exports.getSection = async (req,res,next) => {
	try {
		const section = await sectionServices.getSection(req.params.id);
		res.status(200).json({ success:true, data: section })
	}catch(error) {
		console.log(error)
	}
}

exports.createSection = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId;
		const section = await sectionServices.store(req.body);
		res.status(200).json({ success:true, data: section })
	}catch(error) {
		console.log(error)
	}
}


exports.updateSection = async (req,res,next) => {
	try {
		const section = await SectionServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: section })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteSection = async (req,res,next) => {
	try {
		await SectionServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}