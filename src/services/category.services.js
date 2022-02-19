const Category = require('../models/2-category');

module.exports = class CategoryServices {
	// get all Categorys
	static async getCategories() {
		try {
			const categories = await Category.findAll();
			return categories;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single Category
	static async getCategory(categoryId) {
		try {
			const category = await Category.findByPk(categoryId);
			if (!category) {
				console.log('no Category with that id');
				return false;
			}
			return category;
		} catch (error) {
			console.log(error);
		}
	}

	//store a Category
	static async store(data) {
		try {
			const category = await Category.create(data);
			return category;
		} catch (error) {
			console.log(error);
		}
	}

	// update a Category
	static async update(CategoryId, data) {
		try {
			const oldCategory = await Category.findByPk(CategoryId)
			if (!oldCategory) {
				return false;
			}
			const updatedCategory = await oldCategory.update(data);
			return updatedCategory;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a Category
	static async delete(categoryId) {
		try {
			const category = await Category.findByPk(categoryId);
			if (!category) {
				return false;
			}
			const deleted = await category.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}