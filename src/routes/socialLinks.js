const express = require('express');
const {
	getSocialLinks,	
	createSocialLinks,
	updateSocialLinks,
	deleteSocialLinks
} = require('../controllers/socialLinks')

// middlewares
const { protect, authorize } = require('../middleware/auth')

// Validation
const {socialLinksValidationRules,socialLinksValidate} = require('../validation/socialLinks');

const router = express.Router();

router.use(protect)

router.get('/:userId',authorize('user','admin'),getSocialLinks);

router.post('/create/:lectureId',authorize('user','admin'),socialLinksValidationRules(),socialLinksValidate,createSocialLinks);

router.put('/update/:id',authorize('user','admin'),socialLinksValidationRules(),socialLinksValidate,updateSocialLinks);

router.delete('/delete/:id',authorize('user','admin'),deleteSocialLinks);


module.exports = router