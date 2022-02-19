const express = require('express');
const {
	getAllStudentWillLearn,
	getStudentWillLearn,
	createStudentWillLearn,
	updateStudentWillLearn,
	deleteStudentWillLearn
} = require('../controllers/studentWillLearn')

// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	studentWillLearnValidationRules,
	studentWillLearnValidate
} = require('../validation/studentWillLearn')

const router = express.Router();

router.use(protect)

router.get('/:courseId', authorize('user', 'admin'), getAllStudentWillLearn);

router.get('/single/:id', authorize('user', 'admin'), getStudentWillLearn);

router.post('/create/:courseId', authorize('user', 'admin'), studentWillLearnValidationRules(), studentWillLearnValidate, createStudentWillLearn);

router.put('/update/:id', authorize('user', 'admin'), studentWillLearnValidationRules(), studentWillLearnValidate, updateStudentWillLearn);

router.delete('/delete/:id', authorize('user', 'admin'), deleteStudentWillLearn);


module.exports = router