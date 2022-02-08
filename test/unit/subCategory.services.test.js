const subcategoryServices = require('../../src/services/subcategory.services');
const SubCategory = require('../../src/models/3-subcategory')
const Category = require('../../src/models/2-category')
const database = require('../../src/config/database');

// connect to database
beforeAll(async () => {
	await database.sync();
});

beforeEach(async () => {
	await Category.destroy({where:{}})
	await SubCategory.destroy({where:{}})
	await Category.bulkCreate([
		{
			id:1,
			name: "Programming",
		}, 
		{
			id:2,
			name: "sports",
		}
	])

	await SubCategory.bulkCreate([
		{
			id:1,
			name: "Node.js",
			categoryId:1
		}, 
		{
			id:2,
			name: "football",
			categoryId:2
		}
	])

});

it("Should get all the subcategories ",async () => {
	const subCategories = await subcategoryServices.getSubCategories()
	await expect(subCategories).toEqual(expect.any(Array))
})

it("Should get single subcategory by id",async () => {
	const subCategory = await subcategoryServices.getSubCategory(1)
	expect(subCategory.name).toBe('Node.js')
})

it("Should give false when searching for unexisting subcategory",async () => {
	const subCategory = await subcategoryServices.getSubCategory(22)
	expect(subCategory).toBe(false)
})

it("Should create new subcategory", async () => {
	data = { name : "music" }
	const subCategory = await subcategoryServices.store(data)
	expect(subCategory.name).toBe('music')
})

it("Should update a subcategory",async () => {
	data = { name: "software" }
	const subCategory = await subcategoryServices.update(1,data)
	expect(subCategory.name).toBe('software')
})

it("Should give false when searching for unexisting subcategory",async () => {
	data = { name: "software" }
	const subCategory = await subcategoryServices.update(10,data)
	expect(subCategory).toBe(false)
})


it("Should delete a subcategory",async () => {
	const subCategory = await subcategoryServices.delete(1)
	expect(subCategory).toBe(true)
})

it("Should give false when searching for unexisting subcategory",async () => {
	const subCategory = await subcategoryServices.delete(10)
	expect(subCategory).toBe(false)
})