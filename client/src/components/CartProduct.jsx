import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px;
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	border: 0.4px solid #00695c;
	border-radius: 10%;
	padding: 5px;
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
`;

const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;
const Icon = styled.div`
	cursor: pointer;
`;
function CartProduct({ data }) {
	const dispatch = useDispatch();
	const cartData = useSelector((state) => state.cartReducer.cart.data);
	const itemCount = cartData.get(data._id)?.count;

	const manageCart = (add) => {
		dispatch({
			type: add ? 'add-to-Cart' : 'remove-from-cart',
			payload: { ...data },
		});
	};
	return (
		<>
			<Product>
				<ProductDetail>
					<Image src={data.image} />
					<Details>
						<ProductName>
							<b>Product:</b> {data.title}
						</ProductName>
						<ProductId>
							<b>ID:</b> {data._id}
						</ProductId>
					</Details>
				</ProductDetail>
				<PriceDetail>
					<ProductAmountContainer>
						<Icon onClick={() => manageCart(false)}>
							<Remove />
						</Icon>
						<ProductAmount>{itemCount}</ProductAmount>
						<Icon>
							<Add onClick={() => manageCart(true)} />
						</Icon>
					</ProductAmountContainer>
					<ProductPrice>₹ {data.price}</ProductPrice>
				</PriceDetail>
			</Product>
			<Hr />
		</>
	);
}

export default CartProduct;
