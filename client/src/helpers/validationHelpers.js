export const validateField = (field, val, password) => {
	const value = val.toString().trim();
	if (!value) {
		return `${field} is required.`;
	}
	switch (field) {
		case 'First Name':
			return validateString(field, value, 3);
		case 'Last Name':
			return validateString(field, value, 1);
		case 'Email':
			return validateEmail(value);
		case 'Password':
			return validatePassword(value);
		case 'Confirm Password':
			return validateConfirmPassword(password, value);
		default:
			break;
	}
};

export const validateString = (field, value, validLength) => {
	const regex = /^[A-Za-z]+$/;
	const validName = regex.test(value);
	if (!validName) {
		return `Please provide valid ${field}.`;
	} else if (validLength && value.length < validLength) {
		return `${field} must contain at least ${validLength} characters.`;
	} else {
		return '';
	}
};

export const validateEmail = (email) => {
	const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
		email.trim()
	);
	if (validEmail) {
		return '';
	}
	return `Provide a valid email address.`;
};

export const validatePassword = (password) => {
	if (password.length < 8) {
		return 'Password must contain at least 8 characters.';
	} else {
		return '';
	}
};

export const validateConfirmPassword = (password, confirmPwd) => {
	if (password !== confirmPwd) {
		return 'Password confirmation does not match.';
	} else {
		return '';
	}
};
