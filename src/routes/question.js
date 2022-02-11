const express = require('express');
const {
	getQuestions,
	getQuestion,
	createQuestion,
	updateQuestion,
	deleteQuestion
} = require('../controllers/questions')

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {questionsValidationRules,questionsValidate} = require('../validation/questions');

const router = express.Router();

router.use(protect)

router.get('/:courseId',authorize('user','admin'),getQuestions);

router.get('/single/:id',authorize('user','admin'),getQuestion);

router.post('/create/:lectureId',authorize('user','admin'),questionsValidationRules(),questionsValidate,createQuestion);

router.put('/update/:id',authorize('user','admin'),questionsValidationRules(),questionsValidate,updateQuestion);

router.delete('/delete/:id',authorize('user','admin'),deleteQuestion);


module.exports = router