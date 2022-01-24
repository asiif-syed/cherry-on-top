import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCartTotal } from '../helpers/dataHelpers';
import StripeCheckout from 'react-stripe-checkout';
import { post } from '../helpers/axiosHelpers';

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === 'total' && '500'};
	font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
	cursor: pointer;
`;
function CartSummary({ cartData, payButton }) {
	const KEY = process.env.REACT_APP_STRIPE;
	const [stripeToken, setStripeToken] = useState(null);
	const navigation = useNavigate();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.loginReducer.userData.token);
	const onToken = (paymentToken) => {
		debugger;
		setStripeToken(paymentToken);
	};
	const cartTotal = getCartTotal(cartData);
	const handleCheckout = () => {
		if (token) {
			navigation('/payments');
		} else {
			dispatch({
				type: 'login-error',
				message: 'Please login to proceed',
			});
			navigation('/login');
		}
	};
	useEffect(() => {
		const makeRequest = async () => {
			try {
				const url = `${process.env.REACT_APP_BASE_URL}/checkout/payment`;
				const res = await post(url, {
					tokenId: stripeToken.id,
					amount: 500,
				});
				debugger;
				// history.pushState(
				// 	{
				// 		stripeData: res.data,
				// 		products: cart,
				// 	},
				// 	'',
				// 	'/success'
				// );
			} catch {}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cartTotal]);
	return (
		<Summary>
			<SummaryTitle>ORDER SUMMARY</SummaryTitle>
			<SummaryItem>
				<SummaryItemText>Subtotal</SummaryItemText>
				<SummaryItemPrice>₹ {cartTotal}</SummaryItemPrice>
			</SummaryItem>
			<SummaryItem>
				<SummaryItemText>Estimated Shipping</SummaryItemText>
				<SummaryItemPrice>₹ 5.90</SummaryItemPrice>
			</SummaryItem>
			<SummaryItem>
				<SummaryItemText>Shipping Discount</SummaryItemText>
				<SummaryItemPrice>₹ -5.90</SummaryItemPrice>
			</SummaryItem>
			<SummaryItem type='total'>
				<SummaryItemText>Total</SummaryItemText>
				<SummaryItemPrice>₹ {cartTotal}</SummaryItemPrice>
			</SummaryItem>

			{payButton ? (
				<StripeCheckout
					name='Lama Shop'
					image='https://avatars.githubusercontent.com/u/1486366?v=4'
					billingAddress
					shippingAddress
					description={`Your total is ₹ ${cartTotal}`}
					amount={cartTotal * 100}
					token={onToken}
					stripeKey={KEY}
				>
					<Button>PAY NOW</Button>
				</StripeCheckout>
			) : (
				<Button onClick={handleCheckout}>CHECKOUT NOW</Button>
			)}
		</Summary>
	);
}

export default CartSummary;
