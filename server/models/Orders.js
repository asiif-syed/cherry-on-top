const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema(
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
		amount: { type: Number, required: true },
		address: { type: Object, required: true },
		status: { type: String, required: true, default: 'Pending' },
	},
	{ timestampts: true }
);

const OrderModel = mongoose.model('Orders', orderSchema);

module.exports = OrderModel;
