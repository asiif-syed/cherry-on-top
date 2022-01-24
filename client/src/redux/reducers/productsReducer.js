import { cloneDeep } from 'lodash';
const initialState = {
	isLoading: false,
	products: {},
	orders: {},
	orderError: '',
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'is-loading':
			return { ...state, isLoading: action.isLoading };

		case 'update-products':
			return {
				...state,
				products: {
					...state.products,
					[action.payload.category]: [cloneDeep(action.payload.data)],
				},
			};
		case 'update-order':
			return {
				...state,
				order: action.order,
			};
		case 'order-error':
			return {
				...state,
				orderError: action.error,
			};
		default:
			return state;
	}
};

export default productsReducer;
