import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CartSummary from '../components/CartSummary';
import { getCartItemsInArray } from '../helpers/dataHelpers';

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10rem 15rem;
`;
function Payments() {
	const cartData = useSelector((state) => state.cartReducer.cart.data);
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		const cartList = getCartItemsInArray(cartData);
		setCartItems(cartList);
		if (!cartList.length) {
			navigate('/');
		}
	}, [cartData]);
	return (
		<Container>
			<CartSummary cartData={cartItems} payButton={true} />;
		</Container>
	);
}

export default Payments;
