const categoryServices = require('../../src/services/category.services');
const Category = require('../../src/models/2-category')
const database = require('../../src/config/database');

// connect to database
beforeAll(async () => {
	await database.sync();
});

beforeEach(async () => {
	await Category.destroy({where:{}})
	await Category.bulkCreate([
		{
			id:1,
			name: "Programming"
		}, 
		{
			id:2,
			name: "sports"
		}
	])

});

it("Should get all the categories ",async () => {
	const categories = await categoryServices.getCategories()
	await expect(categories).toEqual(expect.any(Array))
})

it("Should get single category by id",async () => {
	const category = await categoryServices.getCategory(1)
	expect(category.name).toBe('Programming')
})

it("Should give false when searching for unexisting category",async () => {
	const category = await categoryServices.getCategory(22)
	expect(category).toBe(false)
})

it("Should create new category", async () => {
	data = { name : "music" }
	const category = await categoryServices.store(data)
	expect(category.name).toBe('music')
})

it("Should update a category",async () => {
	data = { name: "software" }
	const category = await categoryServices.update(1,data)
	expect(category.name).toBe('software')
})

it("Should give false when searching for unexisting category",async () => {
	data = { name: "software" }
	const category = await categoryServices.update(10,data)
	expect(category).toBe(false)
})


it("Should delete a category",async () => {
	const category = await categoryServices.delete(1)
	expect(category).toBe(true)
})

it("Should give false when searching for unexisting category",async () => {
	const category = await categoryServices.delete(10)
	expect(category).toBe(false)
})