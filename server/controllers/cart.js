const Cart = require('../models/Cart');

//Add Item
const addItem = async (req, res) => {
	const newCart = new Cart(req.body.cartData);
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	}
};

// Update Item
const updateItem = async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
};

// Delte Item
const deleteItem = async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json('Cart has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
};

// Get a User's cart
const getUserCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	} catch (err) {
		res.status(500).json(err);
	}
};

// Get all users cart
const getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json(carts);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = { addItem, updateItem, deleteItem, getUserCart, getAllCarts };
