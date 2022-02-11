const notificationServices = require('../services/notification.services');


exports.getNotifications = async (req,res,next) => {
	try {
		const notifications = await notificationServices.getNotifications(req.params.userId);
		res.status(200).json({ success:true, data: notifications })
	}catch(error) {
		console.log(error)
	}
}

exports.getNotification = async (req,res,next) => {
	try {
		const notification = await notificationServices.getNotification(req.params.id);
		res.status(200).json({ success:true, data: notification })
	}catch(error) {
		console.log(error)
	}
}

exports.createNotification = async (req,res,next) => {
	try {
		req.body.userId = req.params.userId
		const notification = await notificationServices.store(req.body);
		res.status(200).json({ success:true, data: notification })
	}catch(error) {
		console.log(error)
	}
}


exports.updateNotification = async (req,res,next) => {
	try {
		const notification = await notificationServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: notification })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteNotification = async (req,res,next) => {
	try {
		await notificationServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}