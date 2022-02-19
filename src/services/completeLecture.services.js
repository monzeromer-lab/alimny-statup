const CompleteLecture = require('../models/914-CompleteLecture');

module.exports = class CompleteLectureServices {
	// get all CompleteLectures
	static async getCompleteLectures(userId, courseId) {
		try {
			const completeLectures = await CompleteLecture.findAll({
				where: {
					userId: userId
				}
			});
			return completeLectures;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single CompleteLecture
	static async getCompleteLecture(CompleteLectureId) {
		try {
			const completeLecture = await CompleteLecture.findByPk(CompleteLectureId);
			if (!completeLecture) {
				console.log('no CompleteLecture with that id');
				return false;
			}
			return completeLecture;
		} catch (error) {
			console.log(error);
		}
	}

	//store a CompleteLecture
	static async store(data) {
		try {
			const completeLecture = await CompleteLecture.create(data);
			return completeLecture;
		} catch (error) {
			console.log(error);
		}
	}

	// update a CompleteLecture
	static async update(CompleteLectureId, data) {
		try {
			const oldCompleteLecture = await CompleteLecture.findByPk(CompleteLectureId)
			if (!oldCompleteLecture) {
				return false;
			}
			const updatedCompleteLecture = await oldCompleteLecture.update(data);
			return updatedCompleteLecture;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a CompleteLecture
	static async delete(CompleteLectureId) {
		try {
			const completeLecture = await CompleteLecture.findByPk(CompleteLectureId);
			if (!completeLecture) {
				return false;
			}
			await completeLecture.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}