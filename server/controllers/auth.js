const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { extractErrors } = require('../utilities/errorHandlers');
const jwt = require('jsonwebtoken');
const { constants } = require('../utilities/constants');

// REGISTER USER
const register = async (req, res, next) => {
	/*
	 * Used to register new user.
	 * API -> user/register
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const email = req.body.email;
		const password = req.body.password;
		const isAdmin = req.body.isAdmin;
		// Checking if the user exists with the provided email.
		const userExists = await UserModel.findOne({ email });
		if (userExists) {
			// Throws an error if user already exits with the provided email.
			const error = new Error(constants.errorMessage.emailExists);
			error.status = 400;
			throw error;
		}
		// Hashing provided password
		const hashedPassword = await bcrypt.hash(password, 12);
		// Saving the user to DB
		const newUser = new UserModel({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			isAdmin,
		});
		const result = await newUser.save();
		res
			.status(201)
			.json({ message: constants.messages.userRegistered, result });
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};
// Login
const login = async (req, res, next) => {
	/*
	 * Used to update user's password.
	 * API -> user/reset-password
	 */
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// Throws error if data is not valid
			const err = extractErrors(errors);
			const error = new Error(err.message);
			error.status = err.status;
			throw error;
		}
		const email = req.body.email;
		const password = req.body.password;
		// Fetching the user with provided email.
		const userDetails = await UserModel.findOne({ email });
		if (!userDetails) {
			// Throwing an error if user does not exist.
			const error = new Error(constants.errorMessage.noEmailFound);
			error.status = 400;
			throw error;
		}
		// Comparing the passwords
		const isValidPassword = await bcrypt.compare(
			password,
			userDetails.password
		);
		if (!isValidPassword) {
			// Throws error if the password is not valid.
			const error = new Error(constants.errorMessage.invalidPwd);
			error.status = 401;
			throw error;
		}
		const secretKey = process.env.SECRET_KEY;
		// Creating a token
		const token = jwt.sign(
			{
				email,
				userId: userDetails._id.toString(),
				isAdmin: userDetails.isAdmin,
			},
			secretKey,
			{ expiresIn: '1d' }
		);
		// Sending the response with token and userId
		res.status(201).json({
			token,
			email,
			userId: userDetails._id,
			isAdmin: userDetails.isAdmin,
		});
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};

const getUsersList = async (req, res, next) => {
	/*
	 * Used to get all the user details.
	 * API -> user/users-list
	 * Only Admin has access
	 */
	try {
		if (!req.isAdmin) {
			// Throwing error if the user is not an admin
			const error = new Error('No authorizations');
			error.status = 401;
			throw error;
		}
		// Sending the users
		const usersList = await UserModel.find();
		res.status(200).json(usersList);
	} catch (err) {
		if (!err.status) {
			err.status = 500;
		}
		next(err);
	}
};
module.exports = { register, login, getUsersList };
