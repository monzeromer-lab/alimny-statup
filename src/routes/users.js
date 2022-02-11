const express = require('express');
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

// Middlewares
const {protect , authorize} = require('../middleware/auth');

// Validation
const {registerValidationRules,registerValidate} = require('../validation/auth');

const router = express.Router();

router.use(protect)

router.get('/',authorize('user','admin'),getUsers)

router.get('/:id',authorize('admin'),getUser)

router.post('/create',authorize('admin'),registerValidationRules(),registerValidate,createUser)

router.put('/update/:id',authorize('user','admin'),updateUser)

router.delete('/delete/:id',authorize('admin'),deleteUser)


module.exports = router;