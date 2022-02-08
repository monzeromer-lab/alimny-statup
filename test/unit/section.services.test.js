const sectionServices = require('../../src/services/section.services');
const Category = require('../../src/models/2-category');
const SubCategory = require('../../src/models/3-subCategory');
const Course = require('../../src/models/4-course');
const Section = require('../../src/models/5-section');
const database = require('../../src/config/database');

// connect to database
beforeAll(async () => {
	await database.sync({forec:true});
});

beforeEach(async () => {
	await Category.destroy({where:{}})
	await SubCategory.destroy({where:{}})
	await Course.destroy({where:{}})
	await Section.destroy({where:{}})

	await Category.bulkCreate([
		{
			id:1,
			name: 'programming'
		},
		{
			id:2,
			name: 'Web'
		},
	])

	await SubCategory.bulkCreate([
		{
			id:1,
			categoryId:1,
			name: 'netwoek'
		},
		{
			id:2,
			categoryId:2,
			name: 'db'
		},
	])

	try {
		await Course.bulkCreate([
			{
				id:1,
				categoryId:1,
				subCategoryId:1,
				name: 'Node.js',
				description: "any thing",
				level:"Beginner",
				price: '3000'
			},
			{
				id:2,
				categoryId:2,
				subCategoryId:2,
				name: 'Node.js',
				description: "any thing",
				level:"Beginner",
				price: '3000'
			}
		]);
	}catch(error) {
		console.log(error)
	}
	try{
		await Section.bulkCreate([
			{
				id:1,
				name: "Introduction",
				description: "Welcome to the course",
				courseId:2
			},
			{
				id:2,
				name: "wrap up",
				description: "Welcome to the course",
				courseId:2
			},
		])
	}catch(error) {
		console.log(error)
	}
})

it("Should get all sections" , async () => {
	try {
		const sections = await sectionServices.getSections();
		console.log(sections)
		expect(sections).toEqual(expect.any(Array))
	}catch(error) {
		console.log(error)
	}
})