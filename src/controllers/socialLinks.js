const socialLinksServices = require('../services/socialLinks.services');


exports.getSocialLinks = async (req,res,next) => {
	try {
		const socialLinks = await socialLinksServices.getSocialLinks(req.params.userId);
		res.status(200).json({ success:true, data: socialLinks })
	}catch(error) {
		console.log(error)
	}
}

exports.createSocialLinks = async (req,res,next) => {
	try {
		req.body.userId = req.user.id
		const socialLinks = await socialLinksServices.store(req.body);
		res.status(200).json({ success:true, data: socialLinks })
	}catch(error) {
		console.log(error)
	}
}


exports.updateSocialLinks = async (req,res,next) => {
	try {
		const socialLinks = await socialLinksServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: socialLinks })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteSocialLinks = async (req,res,next) => {
	try {
		await socialLinksServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}