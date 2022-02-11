const Section = require('../models/5-Section');
const Course = require('../models/4-Course');

module.exports = class SectionServices {
	// get all Sections
	static async getSections(courseId) {
		try{
			const sections = await Section.findAll({
				where: {courseId:courseId}
			},{include:Course});
			return sections;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Section
	static async getSection(sectionId) {
		try{
			const section = await Section.findByPk(sectionId);
			if(!section) {
				console.log('no Section with that id');
				return false;
			}
			return section;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Section
	static async store(data) {
		try{
			const section = await Section.create(data);
			return section;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Section
	static async update(sectionId,data) {
		try{
			const oldSection = await Section.findByPk(sectionId)
			if(!oldSection) {
				return  false;
			}
			const updatedSection = await oldSection.update(data);
			return updatedSection;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Section
	static async delete(sectionId) {
		try{
			const section = await Section.findByPk(sectionId);
			if(!section) {
				return false;
			}
			const deleted = await section.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}