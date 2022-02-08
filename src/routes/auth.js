const express = require('express');
const {
	register,
	login,
	logout,
	forgotPassword,
	resetPassword,
	verfiyEmail,
} = require('../controllers/auth')

// Auth middelware
const { protect } = require('../middleware/auth')

// Validation
const {loginValidationRules,registerValidationRules,loginValidate,registerValidate} = require('../validation/auth');

const router = express.Router();

router.post('/register',registerValidationRules(),registerValidate,register);

router.post('/login',loginValidationRules(),loginValidate,login);

router.post('/logout',protect,logout);

router.post('/forgotPassword', forgotPassword);

router.post('/resetPassword/:resetToken',resetPassword);

router.get('/confirm/:confirmationCode',verfiyEmail);

module.exports = router