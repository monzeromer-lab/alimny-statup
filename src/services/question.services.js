const Question = require('../models/918-Question');

module.exports = class QuestionServices {
	// get all Questions
	static async getQuestions(courseId) {
		try{
			const questions = await Question.findAll({where:{courseId:courseId}});
			return questions;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Question
	static async getQuestion(QuestionId) {
		try{
			const question = await Question.findByPk(QuestionId);
			if(!question) {
				console.log('no Question with that id');
				return false;
			}
			return question;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Question
	static async store(data) {
		try{
			const question = await Question.create(data);
			return question;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Question
	static async update(QuestionId,data) {
		try{
			const oldQuestion = await Question.findByPk(QuestionId)
			if(!oldQuestion) {
				return  false;
			}
			const updatedQuestion = await oldQuestion.update(data);
			return updatedQuestion;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Question
	static async delete(QuestionId) {
		try{
			const question = await Question.findByPk(QuestionId);
			if(!question) {
				return false;
			}
			await question.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}