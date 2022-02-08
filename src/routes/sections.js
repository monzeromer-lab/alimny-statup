const express = require('express');
const {
	getSections,
	getSection,
	createSection,
	updateSection,
	deleteSection
} = require('../controllers/sections')

// middlewares
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router.use(protect)

router.get('/:courseId',authorize('user','admin'),getSections);

router.get('/:id',authorize('user','admin'),getSection);

router.post('/create/:courseId',authorize('user','admin'),createSection);

router.put('/update/:id',authorize('user','admin'),updateSection);

router.delete('/delete/:id',authorize('user','admin'),deleteSection);


module.exports = router