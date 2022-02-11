const Notification = require('../models/921-Notification');

module.exports = class NotificationServices {
	// get all Notifications
	static async getNotifications(userId) {
		try{
			const notifications = await Notification.findAll({where:{userId:userId}});
			return notifications;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Notification
	static async getNotification(NotificationId) {
		try{
			const notification = await Notification.findByPk(NotificationId);
			if(!notification) {
				console.log('no Notification with that id');
				return false;
			}
			return notification;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Notification
	static async store(data) {
		try{
			const notification = await Notification.create(data);
			return notification;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Notification
	static async update(NotificationId,data) {
		try{
			const oldNotification = await Notification.findByPk(NotificationId)
			if(!oldNotification) {
				return  false;
			}
			const updatedNotification = await oldNotification.update(data);
			return updatedNotification;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Notification
	static async delete(NotificationId) {
		try{
			const notification = await Notification.findByPk(NotificationId);
			if(!notification) {
				return false;
			}
			await notification.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}