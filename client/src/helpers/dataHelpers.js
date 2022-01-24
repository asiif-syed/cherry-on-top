import { cloneDeep } from 'lodash';
export const handleCartItem = (cartData, newItem, action) => {
	let count = cartData.count ? cartData.count : 0;
	const data = cloneDeep(cartData.data);
	count = action === 'add' ? count + 1 : count - 1;
	const itemExits = data.has(newItem._id);
	if (itemExits) {
		const item = { ...data.get(newItem._id) };
		item.count = action === 'add' ? item.count + 1 : item.count - 1;
		item.count ? data.set(item._id, item) : data.delete(item._id);
	} else {
		action === 'add' && data.set(newItem._id, { ...newItem, count: 1 });
	}
	return { data: cloneDeep(data), count };
};

export const getCartItemsInArray = (cart) => {
	const array = [];
	for (let item of cart.keys()) {
		array.push(cart.get(item));
	}
	return array;
};
export const getCartTotal = (cartData) => {
	return cartData.reduce((total, item) => item.count * item.price + total, 0);
};
