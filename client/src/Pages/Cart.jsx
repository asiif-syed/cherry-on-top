import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CartProduct from '../components/CartProduct';
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';
import { getCartItemsInArray } from '../helpers/dataHelpers';
const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;
const EmptyCart = styled.h1`
	flex: 1;
	border-radius: 10px;
	padding: 20px;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border: ${(props) => props.type === 'filled' && 'none'};
	background-color: ${(props) =>
		props.type === 'filled' ? 'black' : 'transparent'};
	color: ${(props) => props.type === 'filled' && 'white'};
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Info = styled.div`
	flex: 3;
`;

const Cart = () => {
	const navigate = useNavigate();
	const cartData = useSelector((state) => state.cartReducer.cart.data);
	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		setCartItems(getCartItemsInArray(cartData));
	}, [cartData]);
	return (
		<Container>
			<Wrapper>
				<Title>YOUR CART</Title>
				<Top>
					<TopButton onClick={() => navigate('/')}>CONTINUE SHOPPING</TopButton>
				</Top>
				{!cartItems?.length ? (
					<EmptyCart>Your cart is empty.</EmptyCart>
				) : (
					<Bottom>
						<Info>
							{cartItems.map((item) => (
								<CartProduct key={item._id} data={item} />
							))}
						</Info>
						<CartSummary cartData={cartItems} />
					</Bottom>
				)}
			</Wrapper>
		</Container>
	);
};

export default Cart;
