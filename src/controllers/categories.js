const categoryServices = require('../services/category.services');
const asyncHandler = require('../middleware/async')


exports.getCategories = asyncHandler(async (req, res, next) => {

	const categories = await categoryServices.getCategories();
	res.status(200).json({
		success: true,
		data: categories
	})

});

exports.getCategory = asyncHandler(async (req, res, next) => {
	const category = await categoryServices.getCategory(req.params.id);
	res.status(200).json({
		success: true,
		data: category
	})
});

exports.createCategory = asyncHandler(async (req, res, next) => {
	const category = await categoryServices.store(req.body);
	res.status(200).json({
		success: true,
		data: category
	})
});


exports.updateCategory = asyncHandler(async (req, res, next) => {
	const category = await categoryServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: category
	})
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
	await categoryServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});