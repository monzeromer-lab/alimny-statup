const express = require('express');
const {
	getSubCategories,
	getSubCategoriesOfCategory,
	getSubCategory,
	createSubCategory,
	updateSubCategory,
	deleteSubCategory
} = require('../controllers/subCategories')

// middleawre
const { protect , authorize } = require('../middleawre/auth');

const router = express.Router();

router.use(prtect)

router.get('/',authorize('admin'),getSubCategories);

router.get('/category/:categoryId',authorize('user','admin'),getSubCategoriesOfCategory);

router.get('/:id',authorize('admin'),getSubCategory);

router.post('/create',authorize('admin'),createSubCategory);

router.put('/update/:id',authorize('admin'),updateSubCategory);

router.delete('/delete/:id',authorize('admin'),deleteSubCategory);


module.exports = router