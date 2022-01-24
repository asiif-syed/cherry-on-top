const { body, validationResult } = require('express-validator');
const userController = require('../controllers/users');
const auth = require('../middleware/isAuth');
const { constants } = require('../utilities/constants');
const { comparePasswords } = require('../utilities/errorHandlers');

const router = require('express').Router();
// RESET PASSWORD
router.put(
	constants.routes.resetPassword,
	body(constants.userFields.email)
		.isEmail()
		.withMessage(constants.errorMessage.invalidEmail),
	body(constants.userFields.password)
		.trim()
		.isLength({ min: 8 })
		.withMessage(constants.errorMessage.invalidPwdLength),
	body(constants.userFields.confirmPassword).trim().custom(comparePasswords),
	userController.resetPassword
);

//DELETE
router.delete('/:id', auth.isAuth, userController.deleteUser);

//GET USER
router.get('/:id', auth.isAdmin, userController.getUser);

//GET ALL USERS
router.get('/', auth.isAdmin, userController.getAllUsers);

module.exports = router;
