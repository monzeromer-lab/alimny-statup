const SocialLinks = require('../models/917-SocialLinks');

module.exports = class SocialLinksServices {
	// get all SocialLinkss
	static async getSocialLinks(userId) {
		try{
			const socialLinks = await SocialLinks.findAll({where:{userId:userId}});
			return socialLinks;
		}catch(error) {
			console.log(error);
		}
	}

	//store a SocialLinks
	static async store(data) {
		try{
			const socialLinks = await SocialLinks.create(data);
			return socialLinks;
		}catch(error) {
			console.log(error);
		}
	}

	// update a SocialLinks
	static async update(SocialLinksId,data) {
		try{
			const oldSocialLinks = await SocialLinks.findByPk(SocialLinksId)
			if(!oldSocialLinks) {
				return  false;
			}
			const updatedSocialLinks = await oldSocialLinks.update(data);
			return updatedSocialLinks;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a SocialLinks
	static async delete(SocialLinksId) {
		try{
			const socialLinks = await SocialLinks.findByPk(SocialLinksId);
			if(!socialLinks) {
				return false;
			}
			await socialLinks.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}