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
const { protect , authorize } = require('../middleware/auth');

// Validation
const {subCategoryValidationRules,subCategoryValidate} = require('../validation/subCategory');

const router = express.Router();

router.use(protect)

router.get('/',authorize('admin'),getSubCategories);

router.get('/category/:categoryId',authorize('user','admin'),getSubCategoriesOfCategory);

router.get('/:id',authorize('admin'),getSubCategory);

router.post('/create',authorize('admin'),subCategoryValidationRules(),subCategoryValidate,createSubCategory);

router.put('/update/:id',authorize('admin'),subCategoryValidationRules(),subCategoryValidate,updateSubCategory);

router.delete('/delete/:id',authorize('admin'),deleteSubCategory);


module.exports = router