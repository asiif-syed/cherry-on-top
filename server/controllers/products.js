const Product = require('../models/Products');

const addProduct = async (req, res) => {
	const { product } = req.body;
	const newProduct = new Product(product);
	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
};
const updateProduct = async (req, res) => {
	try {
		const { product } = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: product,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
};
const deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json('Product has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
};
const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
};
const getAllProducts = async (req, res) => {
	const qCategory = req.query.category;
	try {
		let products;
		if (qCategory) {
			products = await Product.find({
				category: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}
		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	addProduct,
	updateProduct,
	deleteProduct,
	getProduct,
	getAllProducts,
};
