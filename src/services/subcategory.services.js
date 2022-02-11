const SubCategory = require('../models/3-subCategory');
const Category = require('../models/2-category')

module.exports = class subCategoryServices {
	// get all subCategorys
	static async getSubCategories() {
		try{
			const subCategories = await SubCategory.findAll({include:Category});
			return subCategories;
		}catch(error) {
			console.log(error);
		}
	}

	// get all subCategorys
	static async getSubCategoriesOfCategory(categoryId) {
		try{
			const subCategories = await SubCategory.findAll({where: {
				categoryId:categoryId
			},},{include:Category});
			return subCategories;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single subCategory
	static async getSubCategory(subcategoryId) {
		try{
			const subcategory = await SubCategory.findByPk(subcategoryId);
			if(!subcategory) {
				console.log('no subCategory with that id');
				return false;
			}
			return subcategory;
		}catch(error) {
			console.log(error);
		}
	}

	//store a subCategory
	static async store(data) {
		try{
			const subcategory = await SubCategory.create(data);
			return subcategory;
		}catch(error) {
			console.log(error);
		}
	}

	// update a subCategory
	static async update(subCategoryId,data) {
		try{
			const oldsubCategory = await SubCategory.findByPk(subCategoryId)
			if(!oldsubCategory) {
				return  false;
			}
			const updatedsubCategory = await oldsubCategory.update(data);
			return updatedsubCategory;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a subCategory
	static async delete(subCategoryId) {
		try{
			const subcategory = await SubCategory.findByPk(subCategoryId);
			if(!subcategory) {
				return false;
			}
			const deleted = await subcategory.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}