const subCategoryServices = require('../services/subCategory.services');


exports.getSubCategories = async (req,res,next) => {
	try {
		const subCategories = await subCategoryServices.getSubCategories();
		res.status(200).json({ success:true, data:subCategories })
	}catch(error) {
		console.log(error)
	}
}

exports.getSubCategoriesOfCategory = async (req,res,next) => {
	try {
		const subCategories = await subCategoryServices.getSubCategoriesOfCategory(req.params.categoryId);
		res.status(200).json({ success:true, data:subCategories })
	}catch(error) {
		console.log(error)
	}
}

exports.getSubCategory = async (req,res,next) => {
	try {
		const subcategory = await subCategoryServices.getSubCategory(req.params.id);
		res.status(200).json({ success:true, data: subcategory })
	}catch(error) {
		console.log(error)
	}
}

exports.createSubCategory = async (req,res,next) => {
	try {
		const subcategory = await subCategoryServices.store(req.body);
		res.status(200).json({ success:true, data: subcategory })
	}catch(error) {
		console.log(error)
	}
}


exports.updateSubCategory = async (req,res,next) => {
	try {
		const subcategory = await subCategoryServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: subcategory })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteSubCategory = async (req,res,next) => {
	try {
		await subCategoryServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}