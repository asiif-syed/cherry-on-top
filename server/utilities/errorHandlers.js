const { constants } = require('./constants');

const extractErrors = (errors) => {
	return { message: errors.array()[0].msg, status: 400 };
};

const comparePasswords = (value, { req }) => {
	if (value !== req.body.password) {
		throw new Error(constants.errorMessage.passwordMismatch);
	}
	return true;
};

const validateUserRole = (value) => {
	console.log(value);
	if (value === true || value === false) {
		return true;
	}
	throw new Error(constants.errorMessage.invalidRole);
};
module.exports = { extractErrors, comparePasswords, validateUserRole };
