const express = require('express');
const {
	getNotes,
	getNote,
	createNote,
	updateNote,
	deleteNote
} = require('../controllers/notes')

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {noteValidationRules,noteValidate} = require('../validation/note');

const router = express.Router();

router.use(protect)

router.get('/:lectureId',authorize('user','admin'),getNotes);

router.get('/single/:id',authorize('user','admin'),getNote);

router.post('/create/:lectureId',authorize('user','admin'),noteValidationRules(),noteValidate,createNote);

router.put('/update/:id',authorize('user','admin'),noteValidationRules(),noteValidate,updateNote);

router.delete('/delete/:id',authorize('user','admin'),deleteNote);


module.exports = router