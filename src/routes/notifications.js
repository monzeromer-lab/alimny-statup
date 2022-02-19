const express = require('express');
const {
	getNotifications,
	getNotification,
	createNotification,
	updateNotification,
	deleteNotification
} = require('../controllers/notifications')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')


const router = express.Router();

router.use(protect)

router.get('/:userId', authorize('user', 'admin'), getNotifications);

router.get('/single/:id', authorize('user', 'admin'), getNotification);

router.post('/create/:userId', authorize('user', 'admin'), createNotification);

router.put('/update/:id', authorize('user', 'admin'), updateNotification);

router.delete('/delete/:id', authorize('user', 'admin'), deleteNotification);


module.exports = router