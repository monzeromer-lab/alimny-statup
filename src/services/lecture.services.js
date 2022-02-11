const Lecture = require('../models/910-lecture');

module.exports = class LectureServices {
	// get all Lectures
	static async getLectures(sectionId) {
		try{
			const lectures = await Lecture.findAll({where:{sectionId:sectionId}});
			return lectures;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Lecture
	static async getLecture(lectureId) {
		try{
			const lecture = await Lecture.findByPk(lectureId);
			if(!lecture) {
				console.log('no Lecture with that id');
				return false;
			}
			return lecture;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Lecture
	static async store(data) {
		try{
			const lecture = await Lecture.create(data);
			return lecture;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Lecture
	static async update(lectureId,data) {
		try{
			const oldLecture = await Lecture.findByPk(lectureId)
			if(!oldLecture) {
				return  false;
			}
			const updatedLecture = await oldLecture.update(data);
			return updatedLecture;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Lecture
	static async delete(lectureId) {
		try{
			const lecture = await Lecture.findByPk(lectureId);
			if(!lecture) {
				return false;
			}
			await lecture.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}