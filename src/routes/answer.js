const express = require('express');
const {
	getAnswers,
	getAnswer,
	createAnswer,
	updateAnswer,
	deleteAnswer
} = require('../controllers/answer')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	answerValidationRules,
	answerValidate
} = require('../validation/answer');

const router = express.Router();

router.use(protect)

router.get('/:questionId', authorize('user', 'admin'), getAnswers);

router.get('/single/:id', authorize('user', 'admin'), getAnswer);

router.post('/create/:lectureId', authorize('user', 'admin'), answerValidationRules(), answerValidate, createAnswer);

router.put('/update/:id', authorize('user', 'admin'), answerValidationRules(), answerValidate, updateAnswer);

router.delete('/delete/:id', authorize('user', 'admin'), deleteAnswer);


module.exports = router