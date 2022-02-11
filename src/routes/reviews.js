const express = require('express');
const {
	getReviews,
	getReview,
	createReview,
	updateReview,
	deleteReview
} = require('../controllers/reviews')

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {reviewValidationRules,reviewValidate} = require('../validation/reviews');

const router = express.Router();

router.use(protect)

router.get('/:courseId',authorize('user','admin'),getReviews);

router.get('/single/:id',authorize('user','admin'),getReview);

router.post('/create/:courseId',authorize('user','admin'),reviewValidationRules(),reviewValidate,createReview);

router.put('/update/:id',authorize('user','admin'),reviewValidationRules(),reviewValidate,updateReview);

router.delete('/delete/:id',authorize('user','admin'),deleteReview);


module.exports = router