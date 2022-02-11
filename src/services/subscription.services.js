const Subcription = require('../models/920-subscription');

module.exports = class SubcriptionServices {
	// get all Subcriptions
	static async getSubscriptions(userId) {
		try{
			const Subcriptions = await Subcription.findAll({where:{userId:userId}});
			return Subcriptions;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Subcription
	static async getSubscription(id) {
		try{
			const subcription = await Subcription.findByPk(id);
			if(!subcription) {
				console.log('no Subcription with that id');
				return false;
			}
			return subcription;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Subcription
	static async store(data) {
		try{
			const subcription = await Subcription.create(data);
			return subcription;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Subcription
	static async update(SubcriptionId,data) {
		try{
			const oldSubcription = await Subcription.findByPk(SubcriptionId)
			if(!oldSubcription) {
				return  false;
			}
			const updatedSubcription = await oldSubcription.update(data);
			return updatedSubcription;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Subcription
	static async delete(SubcriptionId) {
		try{
			const subcription = await Subcription.findByPk(SubcriptionId);
			if(!subcription) {
				return false;
			}
			await subcription.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}