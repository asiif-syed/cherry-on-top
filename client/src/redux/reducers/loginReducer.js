const initialState = {
	userData: {},
	loginError: '',
	registerError: '',
	registrationSuccess: false,
	resetPasswordError: '',
	resetSuccess: false,
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'login':
			return { ...state, userData: { ...action.payload } };
		case 'login-error':
			return { ...state, loginError: action.message };
		case 'registration-success':
			return {
				...state,
				loginError: 'Registered successfully, please login.',
				registrationSuccess: true,
			};
		case 'reset-success':
			return {
				...state,
				loginError: 'Reset password successfully, please login.',
				resetSuccess: true,
			};
		case 'register-error':
			return {
				...state,
				registerError: action.message,
				registrationSuccess: false,
			};
		case 'reset-pwd-error':
			return {
				...state,
				resetPasswordError: action.message,
				resetSuccess: false,
			};
		case 'logout':
			localStorage.removeItem('token');
			return { ...state, userData: {} };
		default:
			return state;
	}
};

export default loginReducer;
