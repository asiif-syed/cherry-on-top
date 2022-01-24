const jwt = require('jsonwebtoken');
const { constants } = require('../utilities/constants');
const UserModel = require('../models/User');
const isAuth = (req, res, next) => {
	// Reading the token from the request -> Authorization (Format will be 'Bearer <Token>')
	const token = req.get('Authorization')?.split(' ')?.[1];
	if (!token) {
		const error = new Error(constants.errorMessage.noToken);
		error.status = 400;
		throw error;
	}
	let validToken;
	try {
		const secretKey = process.env.SECRET_KEY;
		// Verifying the token
		validToken = jwt.verify(token, secretKey);
	} catch (err) {
		err.status = 500;
		throw err;
	}
	if (!validToken) {
		// Throwing an error when token is not valid.
		const error = new Error(constants.errorMessage.authFailed);
		error.status = 401;
		throw error;
	}

	req.userId = validToken.userId;
	next();
};

const isAdmin = async (req, res, next) => {
	isAuth(req, res, async () => {
		const user = await UserModel.findOne({ _id: req.userId });
		if (user.isAdmin) {
			req.isAdmin = true;
			next();
		} else {
			// Throwing an error when token is not valid.
			const error = new Error(constants.errorMessage.notAdmin);
			error.status = 401;
			throw error;
		}
	});
};
module.exports = { isAuth, isAdmin };
