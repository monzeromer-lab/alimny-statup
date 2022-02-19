const path = require('path');
const express = require('express');
const multer = require('multer');
const {
	getLectures,
	getLecture,
	createLecture,
	lectureVideo,
	updateLecture,
	deleteLecture
} = require('../controllers/lectures');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, 'VID-' + Date.now() + path.extname(file.originalname))
	},
});

const upload = multer({
	storage: storage,
	fileFilter(req, file, cb) {
		console.log(file)
		if (!file.mimetype.startsWith('video')) {
			return new Error('file should be video')
		}
		cb(undefined, cb)
	}
})


// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	lectureValidationRules,
	lectureValidate
} = require('../validation/lecture');

const router = express.Router();

router.use(protect)

router.get('/:sectionId', authorize('user', 'admin'), getLectures);

router.get('/single/:id', authorize('user', 'admin'), getLecture);

router.post('/create/video', authorize('user', 'admin'), upload.single('video'), lectureVideo);

router.post('/create', authorize('user', 'admin'), lectureValidationRules(), lectureValidate, createLecture)

router.put('/update/:id', authorize('user', 'admin'), lectureValidationRules(), lectureValidate, updateLecture);

router.delete('/delete/:id', authorize('user', 'admin'), deleteLecture);


module.exports = router