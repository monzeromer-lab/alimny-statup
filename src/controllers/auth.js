const crypto = require('crypto')
const {
	Op
} = require('sequelize');
const jwt = require('jsonwebtoken')
const User = require('../models/1-user')
const userServices = require('../services/user.services');
const sendEmail = require('../helpers/sendEmail');
const bcrypt = require('bcryptjs')
const asyncHandler = require('../middleware/async')


exports.register = asyncHandler(async (req, res, next) => {

	const token = jwt.sign({
		email: req.body.email
	}, 'cnonocnocno')
	req.body.confirmationCode = token;
	const salt = await bcrypt.genSalt(10)
	req.body.password = await bcrypt.hash(req.body.password, salt)
	const user = await userServices.store(req.body)

	// Create reset url
	const confirmUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/confirm/${token}`;

	const message = `Thanks for signing up Please confirm your email by clicking 
		  					<a href ='${confirmUrl}'>here</a>`

	// Send an email
	await sendEmail({
		email: user.email,
		subject: "Email confirmation",
		message
	});

	sendTokenResponse(user, 200, res)
});

exports.login = asyncHandler(async (req, res, next) => {

	const {
		email,
		password
	} = req.body

	// Validate email & password
	if (!email || !password) {
		return res.status(400).json({
			success: false,
			msg: "email and password are required."
		});
	}

	// Check for user
	const user = await User.findOne({
		where: {
			email
		}
	});

	if (!user) {
		return res.status(400).json({
			success: false,
			msg: "User does'nt found."
		});
	}

	// Check for the password
	const matchedPassword = await user.matchPassword(password);

	if (!matchedPassword) {
		return res.status(400).json({
			success: false,
			msg: "wrong password."
		});
	}

	sendTokenResponse(user, 200, res)
});


exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true
	});

	res.status(200).json({
		success: true,
		data: {}
	});
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({
		where: {
			email: req.body.email
		}
	});

	if (!user) {
		return res.status(404).json({
			sucess: false,
			msg: 'User not found with this email',
		})
	}

	// Get reset token
	const resetToken = await user.getResetPasswordToken();

	await user.save();

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;
	console.log(resetToken)

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		});

		await user.update({
			resetPasswordToken: '',
			resetPasswordExpire: ''
		});

		res.status(200).json({
			success: true,
			data: 'Email sent'
		});
	} catch (err) {
		console.log(err);

		await user.update({
			resetPasswordToken: '',
			resetPasswordExpire: ''
		});

		return res.status(500).json({
			success: false,
			msg: 'email not sent'
		})
	}

	res.status(200).json({
		success: true,
		data: user
	});
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resetToken)
		.digest('hex');
	console.log(resetPasswordToken)
	const user = await User.findOne({
		where: {
			resetPasswordToken: resetPasswordToken,
			resetPasswordExpire: {
				[Op.gt]: Date.now()
			}
		}
	})


	if (!user) {
		return res.status(404).json({
			sucess: false,
			msg: 'User not found with this email',
		})
	}

	// Set new password
	const salt = await bcrypt.genSalt(10);
	req.body.password = await bcrypt.hash(req.body.password, salt);
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);

})

exports.verfiyEmail = asyncHandler(async (req, res, next) => {

	const user = await User.findOne({
		where: {
			confirmationCode: req.params.confirmationCode
		}
	})
	if (!user) {
		return res.status(404).json({
			success: false,
			msg: "user not found"
		})
	}

	await user.update({
		status: 'Active',
		confirmationCode: ''
	})

	res.status(200).json({
		success: true,
		msg: "Your account is active now"
	})


});

// Get token from model,create cookie and send ErrorResponse
const sendTokenResponse = (user, statusCode, res) => {
	// create a token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
		httpOnly: true
	}

	if (process.env.NODE_ENV = 'production') {
		options.secure = true
	}

	res.status(statusCode)
		.cookie('token', token, options)
		.json({
			success: true,
			token
		})
}