const express = require('express');
const {
	getSubscriptions,
	getSubscription,
	createSubscription,
	updateSubscription,
	deleteSubscription
} = require('../controllers/subscription')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')


const router = express.Router();

router.use(protect)

router.get('/:userId', authorize('user', 'admin'), getSubscriptions);

router.get('/single/:id', authorize('user', 'admin'), getSubscription);

router.post('/create/:courseId', authorize('user', 'admin'), createSubscription);

router.put('/update/:id', authorize('user', 'admin'), updateSubscription);

router.delete('/delete/:id', authorize('user', 'admin'), deleteSubscription);


module.exports = router