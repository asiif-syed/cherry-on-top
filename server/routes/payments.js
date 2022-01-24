const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.post('/payment', (req, res) => {
	console.log(
		'🚀 ~ file: payments.js ~ line 5 ~ router.post ~ req',
		req.body.tokenId,
	req.body.amount
	);

	try {
		stripe.charges.create(
			{
				source: req.body.tokenId,
				amount: req.body.amount,
				currency: 'inr',
			},
			(stripeErr, stripeRes) => {
				if (stripeErr) {
					console.log(
						'🚀 ~ file: payments.js ~ line 20 ~ router.post ~ stripeErr',
						stripeErr
					);

					res.status(500).json(stripeErr);
				} else {
					console.log(
						'🚀 ~ file: payments.js ~ line 20 ~ router.post ~ stripeRes',
						stripeRes
					);
					res.status(200).json(stripeRes);
				}
			}
		);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
