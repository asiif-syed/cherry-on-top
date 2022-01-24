const router = require('express').Router();
const {
	createOrder,
	updateOrder,
	deleteOrder,
	getUserOrders,
	getAllOrders,
	getMonthlyIncome,
} = require('../controllers/orders');
const { isAuth, isAdmin } = require('../middleware/isAuth');

//CREATE
router.post('/', isAuth, createOrder);

//UPDATE
router.put('/:id', isAuth, updateOrder);

//DELETE
router.delete('/:id', isAuth, deleteOrder);

//GET USER ORDERS
router.get('/find/:userId', isAuth, getUserOrders);

//GET ALL
router.get('/', isAdmin, getAllOrders);

// GET MONTHLY INCOME

router.get('/income', isAdmin, getMonthlyIncome);

module.exports = router;
