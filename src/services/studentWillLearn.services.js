const StudentWillLearn = require('../models/912-studentWillLearn');

module.exports = class StudentWillLearnServices {
	// get all StudentWillLearns
	static async getAllStudentWillLearn(courseId) {
		try {
			const studentWillLearns = await StudentWillLearn.findAll({
				where: {
					courseId: courseId
				}
			});
			return studentWillLearns;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single StudentWillLearn
	static async getStudentWillLearn(studentWillLearnId) {
		try {
			const studentWillLearn = await StudentWillLearn.findByPk(studentWillLearnId);
			if (!studentWillLearn) {
				console.log('no StudentWillLearn with that id');
				return false;
			}
			return studentWillLearn;
		} catch (error) {
			console.log(error);
		}
	}

	//store a StudentWillLearn
	static async store(data) {
		try {
			const studentWillLearn = await StudentWillLearn.create(data);
			return studentWillLearn;
		} catch (error) {
			console.log(error);
		}
	}

	// update a StudentWillLearn
	static async update(studentWillLearnId, data) {
		try {
			const oldStudentWillLearn = await StudentWillLearn.findByPk(studentWillLearnId)
			if (!oldStudentWillLearn) {
				return false;
			}
			const updatedStudentWillLearn = await oldStudentWillLearn.update(data);
			return updatedStudentWillLearn;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a StudentWillLearn
	static async delete(StudentWillLearnId) {
		try {
			const studentWillLearn = await StudentWillLearn.findByPk(studentWillLearnId);
			if (!studentWillLearn) {
				return false;
			}
			await studentWillLearn.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}