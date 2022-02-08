const categoryServices = require('../services/category.services');


exports.getCategories = async (req,res,next) => {
	try {
		const categories = await categoryServices.getCategories();
		res.status(200).json({ success:true, data: categories })
	}catch(error) {
		console.log(error)
	}
}

exports.getCategory = async (req,res,next) => {
	try {
		const category = await categoryServices.getCategory(req.params.id);
		res.status(200).json({ success:true, data: category })
	}catch(error) {
		console.log(error)
	}
}

exports.createCategory = async (req,res,next) => {
	try {
		const category = await categoryServices.store(req.body);
		res.status(200).json({ success:true, data: category })
	}catch(error) {
		console.log(error)
	}
}


exports.updateCategory = async (req,res,next) => {
	try {
		const category = await categoryServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: category })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteCategory = async (req,res,next) => {
	try {
		await categoryServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}