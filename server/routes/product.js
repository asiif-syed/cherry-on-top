const router = require('express').Router();
const {
	addProduct,
	updateProduct,
	deleteProduct,
	getProduct,
	getAllProducts,
} = require('../controllers/products');
const { isAdmin } = require('../middleware/isAuth');

// Add product
router.post('/add', isAdmin, addProduct);

//UPDATE
router.put('/update/:id', isAdmin, updateProduct);

//DELETE
router.delete('/delete/:id', isAdmin, deleteProduct);

//GET PRODUCT
router.get('/find/:id', getProduct);

//GET ALL PRODUCTS
router.get('/', getAllProducts);

module.exports = router;
