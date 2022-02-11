const Answer = require('../models/919-Answer');

module.exports = class AnswerServices {
	// get all Answers
	static async getAnswers(questionId) {
		try{
			const answer = await Answer.findAll({where:{questionId:questionId}});
			return answer;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Answer
	static async getAnswer(AnswerId) {
		try{
			const answer = await Answer.findByPk(AnswerId);
			if(!answer) {
				console.log('no Answer with that id');
				return false;
			}
			return answer;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Answer
	static async store(data) {
		try{
			const answer = await Answer.create(data);
			return answer;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Answer
	static async update(AnswerId,data) {
		try{
			const oldAnswer = await Answer.findByPk(AnswerId)
			if(!oldAnswer) {
				return  false;
			}
			const updatedAnswer = await oldAnswer.update(data);
			return updatedAnswer;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Answer
	static async delete(AnswerId) {
		try{
			const answer = await Answer.findByPk(AnswerId);
			if(!answer) {
				return false;
			}
			await answer.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}