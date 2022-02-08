const express = require('express');
const {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/',getUsers)

router.get('/:id',getUser)

router.post('/create',createUser)

router.put('/update/:id',updateUser)

router.delete('/delete/:id',deleteUser)


module.exports = router;