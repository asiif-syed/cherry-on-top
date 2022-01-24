const router = require('express').Router();
const {
	addItem,
	updateItem,
	deleteItem,
	getUserCart,
	getAllCarts,
} = require('../controllers/cart');
const { isAuth, isAdmin } = require('../middleware/isAuth');

router.post('/', isAuth, addItem);

//UPDATE
router.put('/:id', isAuth, updateItem);

//DELETE
router.delete('/:id', isAuth, deleteItem);

//GET USER CART
router.get('/find/:userId', isAdmin, getUserCart);

//GET ALL USER'S CART
router.get('/', isAdmin, getAllCarts);

module.exports = router;
