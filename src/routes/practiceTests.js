const express = require('express');
const {
	getPracticeTests,
	getPracticeTest,
	createPracticeTest,
	updatePracticeTest,
	deletePracticeTest
} = require('../controllers/practiceTests')

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {practiceTestValidationRules,practiceTestValidate} = require('../validation/practiceTest');

const router = express.Router();

router.use(protect)

router.get('/:lectureId',authorize('user','admin'),getPracticeTests);

router.get('/single/:id',authorize('user','admin'),getPracticeTest);

router.post('/create/:lectureId',authorize('user','admin'),practiceTestValidationRules(),practiceTestValidate,createPracticeTest);

router.put('/update/:id',authorize('user','admin'),practiceTestValidationRules(),practiceTestValidate,updatePracticeTest);

router.delete('/delete/:id',authorize('user','admin'),deletePracticeTest);


module.exports = router