const User = require('../models/User');
const { validationResult } = require('express-validator');
const { extractErrors } = require('../utilities/errorHandlers');
const bcrypt = require('bcryptjs');
const { constants } = require('../utilities/constants');

// RESET-PASSWORD
const resetPassword = async (req, res, next) => {
	/*
	 * Used to update user's password.
	 * API -> user/reset-password
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			// const err = extractErrors(errors);
			// next(err);
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		const email = req.body.email;
		const password = req.body.password;
		// Checking if the user exists with the provided email.
		const userDetails = await User.findOne({ email });
		if (!userDetails) {
			// Throws an error if user does not exist with provided email.
			const error = new Error(constants.errorMessage.noEmailFound);
			error.status = 400;
			throw error;
		}
		// Hashing provided password
		const hashedPassword = await bcrypt.hash(password, 12);
		userDetails.password = hashedPassword;
		// Updating user details
		const result = await userDetails.save();
		res.status(201).json({ message: constants.messages.pwdUpdated, result });
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};
// DELETE USER
const deleteUser = async (req, res, next) => {
	/*
	 * Used to update user's password.
	 * API -> /:id
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			// const err = extractErrors(errors);
			// next(err);
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		// Checking if the user exists with the provided email.
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json('User has been deleted...');
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};
// GET USER
const getUser = async (req, res, next) => {
	/*
	 * Used to update user's password.
	 * API -> /find/:id
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			// const err = extractErrors(errors);
			// next(err);
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		// Checking if the user exists with the provided email.
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};
//GET ALL USERS
const getAllUsers = async (req, res, next) => {
	/*
	 * Used to update user's password.
	 * API -> /
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			// const err = extractErrors(errors);
			// next(err);
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		const query = req?.query?.new;
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};

//GET USER STATS

// router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
// 	const date = new Date();
// 	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

// 	try {
// 		const data = await User.aggregate([
// 			{ $match: { createdAt: { $gte: lastYear } } },
// 			{
// 				$project: {
// 					month: { $month: '$createdAt' },
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: '$month',
// 					total: { $sum: 1 },
// 				},
// 			},
// 		]);
// 		res.status(200).json(data);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = { resetPassword, deleteUser, getUser, getAllUsers };
