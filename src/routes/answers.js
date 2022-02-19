const express = require('express');
const {
	getAnswers,
	getAnswer,
	createAnswers,
	updateAnswers,
	deleteAnswers
} = require('../controllers/answers')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	answersValidationRules,
	answersValidate
} = require('../validation/answers');

const router = express.Router();

router.use(protect)

router.get('/:practiceTestId', authorize('user', 'admin'), getAnswers);

router.get('/single/:id', authorize('user', 'admin'), getAnswer);

router.post('/create/:lectureId', authorize('user', 'admin'), answersValidationRules(), answersValidate, createAnswers);

router.put('/update/:id', authorize('user', 'admin'), answersValidationRules(), answersValidate, updateAnswers);

router.delete('/delete/:id', authorize('user', 'admin'), deleteAnswers);


module.exports = router