const notificationServices = require('../services/notification.services');
const asyncHandler = require('../middleware/async')


exports.getNotifications = asyncHandler(async (req,res,next) => {
	const notifications = await notificationServices.getNotifications(req.params.userId);
	res.status(200).json({ success:true, data: notifications })
});

exports.getNotification = asyncHandler(async (req,res,next) => {
	const notification = await notificationServices.getNotification(req.params.id);
	res.status(200).json({ success:true, data: notification })
});

exports.createNotification = asyncHandler(async (req,res,next) => {
	req.body.userId = req.params.userId
	const notification = await notificationServices.store(req.body);
	res.status(200).json({ success:true, data: notification })
});


exports.updateNotification = asyncHandler(async (req,res,next) => {
	const notification = await notificationServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: notification })
});

exports.deleteNotification = asyncHandler(async (req,res,next) => {
	await notificationServices.delete(req.params.id);
	res.status(200).json({ success:true })
}