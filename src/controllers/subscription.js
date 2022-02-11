const subscriptionServices = require('../services/subscription.services');


exports.getSubscriptions = async (req,res,next) => {
	try {
		const subscriptions = await subscriptionServices.getSubscriptions(req.params.userId);
		res.status(200).json({ success:true, data: subscriptions })
	}catch(error) {
		console.log(error)
	}
}

exports.getSubscription = async (req,res,next) => {
	try {
		const subscription = await subscriptionServices.getSubscription(req.params.id);
		res.status(200).json({ success:true, data: subscription })
	}catch(error) {
		console.log(error)
	}
}

exports.createSubscription = async (req,res,next) => {
	try {
		req.body.courseId = req.params.courseId
		req.body.userId = req.user.id
		const subscription = await subscriptionServices.store(req.body);
		res.status(200).json({ success:true, data: subscription })
	}catch(error) {
		console.log(error)
	}
}


exports.updateSubscription = async (req,res,next) => {
	try {
		const subscription = await subscriptionServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: subscription })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteSubscription = async (req,res,next) => {
	try {
		await subscriptionServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}