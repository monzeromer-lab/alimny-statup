const socialLinksServices = require('../services/socialLinks.services');
const asyncHandler = require('../middleware/async')


exports.getSocialLinks = asyncHandler(async (req, res, next) => {
	const socialLinks = await socialLinksServices.getSocialLinks(req.params.userId);
	res.status(200).json({
		success: true,
		data: socialLinks
	})
});

exports.createSocialLinks = asyncHandler(async (req, res, next) => {
	req.body.userId = req.user.id
	const socialLinks = await socialLinksServices.store(req.body);
	res.status(200).json({
		success: true,
		data: socialLinks
	})
});


exports.updateSocialLinks = asyncHandler(async (req, res, next) => {
	const socialLinks = await socialLinksServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: socialLinks
	})
});

exports.deleteSocialLinks = asyncHandler(async (req, res, next) => {
	await socialLinksServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});