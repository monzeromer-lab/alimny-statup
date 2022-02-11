const Answers = require('../models/916-Answers');

module.exports = class AnswersServices {
	// get all Answerss
	static async getAllAnswers(practiceTestId) {
		try{
			const answers = await Answers.findAll({where:{practiceTestId:practiceTestId}});
			return answers;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Answers
	static async getAnswers(AnswersId) {
		try{
			const answers = await Answers.findByPk(AnswersId);
			if(!answers) {
				console.log('no Answers with that id');
				return false;
			}
			return answers;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Answers
	static async store(data) {
		try{
			const answers = await Answers.create(data);
			return answers;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Answers
	static async update(AnswersId,data) {
		try{
			const oldAnswers = await Answers.findByPk(AnswersId)
			if(!oldAnswers) {
				return  false;
			}
			const updatedAnswers = await oldAnswers.update(data);
			return updatedAnswers;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Answers
	static async delete(AnswersId) {
		try{
			const answers = await Answers.findByPk(AnswersId);
			if(!answers) {
				return false;
			}
			await answers.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}