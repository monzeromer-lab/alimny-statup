const subscriptionServices = require('../services/subscription.services');
const asyncHandler = require('../middleware/async')

exports.getSubscriptions = asyncHandler(async (req, res, next) => {
	const subscriptions = await subscriptionServices.getSubscriptions(req.params.userId);
	res.status(200).json({
		success: true,
		data: subscriptions
	})
});

exports.getSubscription = asyncHandler(async (req, res, next) => {
	const subscription = await subscriptionServices.getSubscription(req.params.id);
	res.status(200).json({
		success: true,
		data: subscription
	})
});

exports.createSubscription = asyncHandler(async (req, res, next) => {
	req.body.courseId = req.params.courseId
	req.body.userId = req.user.id
	const subscription = await subscriptionServices.store(req.body);
	res.status(200).json({
		success: true,
		data: subscription
	})
});


exports.updateSubscription = asyncHandler(async (req, res, next) => {
	const subscription = await subscriptionServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: subscription
	})
});

exports.deleteSubscription = asyncHandler(async (req, res, next) => {
	await subscriptionServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});