const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');

const { constants } = require('./utilities/constants');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

// Required to avoid CORS errors on client and to send authorization tokens from client
app.use(cors());

// Enables Json responses/requests
app.use(express.json());

// Auth related routes
app.use(constants.routes.auth, authRouter);

// User related routes
app.use(constants.routes.user, userRouter);

// Product related routes
app.use(constants.routes.products, productRouter);

// Cart related routes
app.use(constants.routes.cart, cartRouter);

// Orders related routes
app.use(constants.routes.orders, ordersRouter);

// Payments related routes
app.use(constants.routes.checkout, paymentsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message;
	res.status(status).json({
		error: {
			message,
		},
	});
});

// Connects to MongoDB and spins up express server once the connection is eshtablished.
mongoose.connect(uri, { useNewUrlParser: true }, () => {
	app.listen(port, () => console.log('Express is Running...!'));
});
