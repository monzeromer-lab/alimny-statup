const userServices = require('../services/user.services');
const bcrypt = require('bcryptjs')
const asyncHandler = require('../middleware/async')

exports.getUsers = asyncHandler(async (req,res,next) => {
	const users = await userServices.getUsers();
	res.status(200).json({ success:true, data:users })
});

exports.getUser = asyncHandler(async (req,res,next) => {
	const user = await userServices.getUser(req.params.id);
	res.status(200).json({ success:true, data: user })
});

exports.createUser = asyncHandler(async (req,res,next) => {
	// Encrypt password then save the user
	const salt = await bcrypt.genSalt(10);
	req.body.password = await bcrypt.hash(req.body.password,salt);
	const user = await userServices.store(req.body);
	res.status(200).json({ success:true, data: user })
});


exports.updateUser = asyncHandler(async (req,res,next) => {
	// Encrypt password then save the user
	const user = await userServices.update(req.params.id,req.body);
	res.status(200).json({ success:true, data: user })
});

exports.deleteUser = asyncHandler(async (req,res,next) => {
	await userServices.delete(req.params.id);
	res.status(200).json({ success:true })
});