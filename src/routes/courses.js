const path = require('path')
const express = require('express');
const multer = require('multer');
const {
	getCourses,
	getCourse,
	createCourse,
	updateCourse,
	deleteCourse,
	courseIntro,
	courseCover
} = require('../controllers/courses')

// Auth middleware
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	courseValidationRules,
	courseValidate
} = require('../validation/course');

const router = express.Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, "IMG-" + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage,
	fileFilter(req, file, cb) {
		console.log(file)
		if (!file.mimetype.startsWith('image')) {
			return new Error('file should be image')
		}
		cb(undefined, cb)
	}
})

const video = multer({
	storage: storage,
	fileFilter(req, file, cb) {
		console.log(file)
		if (!file.mimetype.startsWith('video')) {
			return new Error('file should be video')
		}
		cb(undefined, cb)
	}
})


router.use(protect)

router.get('/', authorize('user', 'admin'), getCourses);

router.get('/:id', authorize('user', 'admin'), getCourse);

router.post('/create', authorize('user', 'admin'), courseValidationRules(), courseValidate, createCourse);

router.post('/create/:courseId/cover', authorize('user', 'admin'), upload.single('cover'), courseCover);

router.post('/create/:courseId/intro', authorize('user', 'admin'), video.single('intro'), courseIntro);

router.put('/update/:id', authorize('user', 'admin'), courseValidationRules(), courseValidate, updateCourse);

router.delete('/delete/:id', authorize('user', 'admin'), deleteCourse);


module.exports = router