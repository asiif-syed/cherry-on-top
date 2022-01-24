const { body } = require('express-validator');
const authController = require('../controllers/auth');
const auth = require('../middleware/isAuth');
const { constants } = require('../utilities/constants');
const { comparePasswords } = require('../utilities/errorHandlers');

const router = require('express').Router();
// REGISTER
router.post(
	constants.routes.register,
	body(constants.userFields.firstName)
		.trim()
		.isLength({ min: 1 })
		.withMessage(constants.errorMessage.emptyFirstName),
	body(constants.userFields.lastName)
		.trim()
		.isLength({ min: 1 })
		.withMessage(constants.errorMessage.emptyLastName),
	body(constants.userFields.email)
		.trim()
		.isEmail()
		.withMessage(constants.errorMessage.invalidEmail),
	body(constants.userFields.password)
		.trim()
		.isLength({ min: 8 })
		.withMessage(constants.errorMessage.invalidPwdLength),
	body(constants.userFields.confirmPassword).trim().custom(comparePasswords),
	body(constants.userFields.isAdmin)
		.isBoolean()
		.withMessage(constants.errorMessage.invalidRole),
	authController.register
);
// LOGIN
router.post(
	constants.routes.login,
	body(constants.userFields.email)
		.isEmail()
		.withMessage(constants.errorMessage.invalidEmail),
	body(constants.userFields.password)
		.trim()
		.isLength({ min: 8 })
		.withMessage(constants.errorMessage.invalidPwdLength),
	authController.login
);

module.exports = router;
