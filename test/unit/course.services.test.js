const courseServices = require('../../src/services/course.services');
const Course = require('../../src/models/4-course');
const Category = require('../../src/models/2-category');
const SubCategory = require('../../src/models/3-subcategory');
const database = require('../../src/config/database');

beforeAll(async () => {
	try {
		await database.sync({
			force: true
		});

	} catch (error) {
		console.log(error)
	}
});

beforeEach(async () => {
	await Category.destroy({
		where: {}
	});
	await SubCategory.destroy({
		where: {}
	});
	await Course.destroy({
		where: {}
	});

	await Category.bulkCreate([{
			id: 1,
			name: 'programming'
		},
		{
			id: 2,
			name: 'Web'
		},
	])

	await SubCategory.bulkCreate([{
			id: 1,
			categoryId: 1,
			name: 'netwoek'
		},
		{
			id: 2,
			categoryId: 2,
			name: 'db'
		},
	])

	try {


		await Course.bulkCreate([{
				id: 1,
				categoryId: 1,
				subCategoryId: 1,
				name: 'Node.js',
				description: "any thing",
				level: "Beginner",
				price: '3000'
			},
			{
				id: 2,
				categoryId: 2,
				subCategoryId: 2,
				name: 'Node.js',
				description: "any thing",
				level: "Beginner",
				price: '3000'
			}
		]);
	} catch (error) {
		console.log(error)
	}
});

it('Should return all courses from the database', async () => {
	try {
		const courses = await Course.findAll()
		expect(courses).toEqual(expect.any(Array));
	} catch (error) {
		console.log(error)
	}
})

it("Should get a single course", async () => {
	try {
		const course = await courseServices.getCourse(1)
		expect(course.name).toBe('Node.js')
		expect(course.categoryId).toBe(1)
	} catch (error) {
		console.log(error)
	}
})

it("Should return false when the course is not exists", async () => {
	try {
		const course = await courseServices.getCourse(11)
		expect(course).toBe(false)
	} catch (error) {
		console.log(error)
	}
})

it("Should create new course", async () => {
	const data = {
		id: 3,
		categoryId: 1,
		subCategoryId: 1,
		name: 'React.js',
		description: "any thing",
		level: "Beginner",
		price: '3000'
	};
	try {
		const course = await courseServices.store(data)
		expect(course.name).toBe(data.name)
		expect(course.price).toBe(data.price)

	} catch (error) {
		console.log(error)
	}
})

it("Should update course", async () => {
	const data = {
		name: 'React.js',
		description: "any thing",
		level: "Advanced",
	};
	try {
		const course = await courseServices.update(1, data)
		expect(course.name).toBe(data.name)
		expect(course.level).toBe(data.level)
	} catch (error) {
		console.log(error)
	}
})

it("Should give false when try to update unexisting course", async () => {
	data = {
		name: "software"
	}
	try {
		const course = await courseServices.update(10, data)
		expect(course).toBe(false)
	} catch (error) {
		console.log(error)
	}
})


it("Should delete a course", async () => {
	try {
		const course = await courseServices.delete(1)
		expect(course).toBe(true)
	} catch (error) {
		console.log(error)
	}
})

it("Should give false when try to delete for unexisting course", async () => {
	try {
		const course = await courseServices.delete(10)
		expect(course).toBe(false)

	} catch (error) {
		console.log(error)
	}
})