const express = require('express');
const {
	getCategories,
	getCategory,
	createCategory,
	updateCategory,
	deleteCategory
} = require('../controllers/categories')

// middlewares
const { protect, authorize } = require('../middleware/auth')

const router = express.Router();

router.use(protect)

router.get('/',authorize('user','admin'),getCategories);

router.get('/:id',authorize('admin'),getCategory);

router.post('/create',authorize('admin'),createCategory);

router.put('/update/:id',authorize('admin'),updateCategory);

router.delete('/delete/:id',authorize('admin'),deleteCategory);


module.exports = router