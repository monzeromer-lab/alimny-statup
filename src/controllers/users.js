const userServices = require('../services/user.services');
const bcrypt = require('bcryptjs')

exports.getUsers = async (req,res,next) => {
	try {
		const users = await userServices.getUsers();
		res.status(200).json({ success:true, data:users })
	}catch(error) {
		console.log(error)
	}
}

exports.getUser = async (req,res,next) => {
	try {
		const user = await userServices.getUser(req.params.id);
		res.status(200).json({ success:true, data: user })
	}catch(error) {
		console.log(error)
	}
}

exports.createUser = async (req,res,next) => {
	try {
		// Encrypt password then save the user
		const salt = await bcrypt.genSalt(10);
	    req.body.password = await bcrypt.hash(req.body.password,salt);
		const user = await userServices.store(req.body);
		res.status(200).json({ success:true, data: user })
	}catch(error) {
		console.log(error)
	}
}


exports.updateUser = async (req,res,next) => {
	try {
		// Encrypt password then save the user
		const user = await userServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: user })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteUser = async (req,res,next) => {
	try {
		await userServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}