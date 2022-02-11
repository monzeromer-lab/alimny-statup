const subCategoryServices = require('../services/subCategory.services');
const asyncHandler = require('../middleware/async')


exports.getSubCategories = asyncHandler(async (req,res,next) => {
	const subCategories = await subCategoryServices.getSubCategories();
	res.status(200).json({ success:true, data:subCategories })
});

exports.getSubCategoriesOfCategory = asyncHandler(async (req,res,next) => {
	const subCategories = await subCategoryServices.getSubCategoriesOfCategory(req.params.categoryId);
	res.status(200).json({ success:true, data:subCategories })
});

exports.getSubCategory = asyncHandler(async (req,res,next) => {
	const subcategory = await subCategoryServices.getSubCategory(req.params.id);
	res.status(200).json({ success:true, data: subcategory })
});

exports.createSubCategory = asyncHandler(async (req,res,next) => {
	const subcategory = await subCategoryServices.store(req.body);
	res.status(200).json({ success:true, data: subcategory })
})


exports.updateSubCategory = asyncHandler(async (req,res,next) => {
	const subcategory = await subCategoryServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: subcategory })
});

exports.deleteSubCategory = asyncHandler(async (req,res,next) => {
	await subCategoryServices.delete(req.params.id);
	res.status(200).json({ success:true })
});