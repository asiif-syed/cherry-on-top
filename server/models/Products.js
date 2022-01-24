const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			default: false,
			required: true,
		},
	},
	{ timestampts: true }
);

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;