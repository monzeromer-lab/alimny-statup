const PracticeTest = require('../models/915-PracticeTest');

module.exports = class PracticeTestServices {
	// get all PracticeTests
	static async getPracticeTests(lectureId) {
		try {
			const practiceTests = await PracticeTest.findAll({
				where: {
					lectureId: lectureId
				}
			});
			return practiceTests;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single PracticeTest
	static async getPracticeTest(PracticeTestId) {
		try {
			const practiceTest = await PracticeTest.findByPk(PracticeTestId);
			if (!practiceTest) {
				console.log('no PracticeTest with that id');
				return false;
			}
			return practiceTest;
		} catch (error) {
			console.log(error);
		}
	}

	//store a PracticeTest
	static async store(data) {
		try {
			const practiceTest = await PracticeTest.create(data);
			return practiceTest;
		} catch (error) {
			console.log(error);
		}
	}

	// update a PracticeTest
	static async update(PracticeTestId, data) {
		try {
			const oldPracticeTest = await PracticeTest.findByPk(PracticeTestId)
			if (!oldPracticeTest) {
				return false;
			}
			const updatedPracticeTest = await oldPracticeTest.update(data);
			return updatedPracticeTest;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a PracticeTest
	static async delete(PracticeTestId) {
		try {
			const practiceTest = await PracticeTest.findByPk(PracticeTestId);
			if (!practiceTest) {
				return false;
			}
			await practiceTest.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}