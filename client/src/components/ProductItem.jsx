import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import DisplayCart from '../shared/DisplayCart';
const Info = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.5s ease;
	cursor: pointer;
`;

const Container = styled.div`
	flex: 1;
	margin: 15px;
	height: 350px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f5fbfd;
	position: relative;
	&:hover ${Info} {
		opacity: 1;
	}
	padding: 35px 10px;
`;

const Circle = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	background-color: white;
	position: absolute;
`;
const Title = styled.h1`
	font-size: 25px;
	margin: 10px;
`;
const Image = styled.img`
	height: 85%;
	z-index: 2;
	width: 70%;
`;
const Price = styled.div`
	font-size: 20px;
	margin: 10px;
`;

function ProductItem({ item, category }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [productData, setProductData] = useState({ ...item, count: 0 });
	const cartData = useSelector((state) => state.cartReducer.cart.data);
	const itemCount = !isEmpty(cartData) && cartData?.get(item._id)?.count;
	const manageCart = (add) => {
		setProductData({
			...productData,
			count: add ? productData.count + 1 : productData.count - 1,
		});
		dispatch({
			type: add ? 'add-to-Cart' : 'remove-from-cart',
			payload: productData,
		});
	};
	return (
		<Container
			onClick={() => {
				navigate(`/${category}/${item._id}`);
			}}
		>
			<Title>{productData.title}</Title>
			<Circle />
			<Image src={productData.image} />
			<Info>
				<DisplayCart itemCount={itemCount} manageCart={manageCart} />
			</Info>
			<Price>₹ {productData.price}</Price>
		</Container>
	);
}

export default ProductItem;
