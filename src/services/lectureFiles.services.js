const LectureFile = require('../models/911-lectureFiles');

module.exports = class LectureFilesServices {
	// get all LectureFiles
	static async getLectureFiles(lectureId) {
		try{
			const lectureFiles = await LectureFile.findAll({where:{lectureId:lectureId}});
			return lectureFiles;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single LectureFile
	static async getLectureFile(lectureFileId) {
		try{
			const lectureFile = await LectureFile.findByPk(lectureFileId);
			if(!lectureFile) {
				console.log('no LectureFile with that id');
				return false;
			}
			return lectureFile;
		}catch(error) {
			console.log(error);
		}
	}

	//store a LectureFile
	static async store(data) {
		try{
			const lectureFile = await LectureFile.create(data);
			return lectureFile;
		}catch(error) {
			console.log(error);
		}
	}

	// update a LectureFile
	static async update(lectureFileId,data) {
		try{
			const oldLectureFile = await LectureFile.findByPk(lectureFileId)
			if(!oldLectureFile) {
				return  false;
			}
			const updatedLectureFile = await oldLectureFile.update(data);
			return updatedLectureFile;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a LectureFile
	static async delete(lectureFileId) {
		try{
			const lectureFile = await LectureFile.findByPk(lectureFileId);
			if(!lectureFile) {
				return false;
			}
			await lectureFile.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}