import { handleCartItem } from '../../helpers/dataHelpers';

const initialState = {
	isLoading: false,
	cart: { count: 0, data: new Map() },
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'add-to-Cart':
		case 'remove-from-cart':
			const { data, count } = handleCartItem(
				state.cart,
				action.payload,
				action.type === 'add-to-Cart' ? 'add' : 'remove'
			);
			return { ...state, cart: { data, count } };
		case 'empty-cart':
			return { ...state, cart: { count: 0, data: new Map() } };
		default:
			return state;
	}
};

export default cartReducer;
