const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: [
			{
				productId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
	{ timestampts: true }
);

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
