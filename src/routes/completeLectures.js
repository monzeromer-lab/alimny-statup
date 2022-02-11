const express = require('express');
const {
	getCompleteLectures,
	getCompleteLecture,
	createCompleteLecture,
	updateCompleteLecture,
	deleteCompleteLecture
} = require('../controllers/CompleteLectures')

// middlewares
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router.use(protect)

router.get('/:userId',authorize('user','admin'),getCompleteLectures);

router.get('/single/:id',authorize('user','admin'),getCompleteLecture);

router.post('/create/:lectureId',authorize('user','admin'),createCompleteLecture);

router.put('/update/:id',authorize('user','admin'),updateCompleteLecture);

router.delete('/delete/:id',authorize('user','admin'),deleteCompleteLecture);


module.exports = router