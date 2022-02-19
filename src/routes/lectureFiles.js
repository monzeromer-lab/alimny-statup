const path = require('path');
const express = require('express');
const multer = require('multer');
const {
	getLectureFiles,
	getLectureFile,
	createLectureFile,
	uploadLectureFile,
	updateLectureFile,
	deleteLectureFile
} = require('../controllers/lectureFiles');

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
	// fileFilter(req,file,cb) {
	// 	console.log(file)
	// 	if(!file.mimetype.startsWith('video')) {
	// 		return new Error('file should be video')
	// 	}
	// 	cb(undefined,cb)
	// }
})


// middlewares
const {
	protect,
	authorize
} = require('../middleware/auth')

// Validation
const {
	lectureFileValidationRules,
	lectureFileValidate
} = require('../validation/lectureFiles');

const router = express.Router();

router.use(protect)

router.get('/:lectureId', authorize('user', 'admin'), getLectureFiles);

router.get('/single/:id', authorize('user', 'admin'), getLectureFile);

router.post('/create/file/:id', authorize('user', 'admin'), upload.single('file'), uploadLectureFile);

router.post('/create/:lectureId', authorize('user', 'admin'), lectureFileValidationRules(), lectureFileValidate, createLectureFile);

router.put('/update/:id', authorize('user', 'admin'), lectureFileValidationRules(), lectureFileValidate, updateLectureFile);

router.delete('/delete/:id', authorize('user', 'admin'), deleteLectureFile);


module.exports = router