import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import { Spinner } from 'react-bootstrap';

const Container = styled.div`
	display: flex;
`;
const ImageContainer = styled.div`
	flex: 1;
	padding: 45px;
`;

const Image = styled.img`
	width: 100%;
	height: 90vh;
	object-fit: cover;
`;

const InfoContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 45px;
	height: 100%;
`;
const Title = styled.h1`
	font-size: 40px;
	font-weight: 500;
`;
const Desc = styled.div`
	font-size: 18px;
	margin: 20px 0px;
`;
const PriceInfo = styled.div`
	font-weight: 200;
	font-size: 30px;
	margin: 20px 0;
`;
const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
	cursor: pointer;
`;

const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;

const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`;
const Icon = styled.div`
	cursor: pointer;
`;
function ProductDetails() {
	const params = useParams();
	const category = params.category;
	const item = params.item;
	const products = useSelector(
		(state) => state.productsReducer.products?.[category]?.[0]
	);
	const isLoading = useSelector((state) => state.productsReducer.isLoading);
	const navigation = useNavigate();

	// useEffect(() => {
	// 	if (!products || !products.length) {
	// 		navigation('/');
	// 	}
	// });
	const product = products?.filter((menuItem) => menuItem._id === item)?.[0];
	const dispatch = useDispatch();
	const cartData = useSelector((state) => state.cartReducer.cart.data);
	const itemCount = cartData?.get(product._id)?.count;
	const manageCart = (add) => {
		dispatch({
			type: add ? 'add-to-Cart' : 'remove-from-cart',
			payload: { ...product },
		});
	};
	return isLoading ? (
		<Spinner />
	) : (
		<Container>
			<ImageContainer>
				<Image src={product.image} />
			</ImageContainer>
			<InfoContainer>
				<Title>{product.title}</Title>
				<Desc>{product.description}</Desc>
				<PriceInfo>Price: ₹ {product.price}</PriceInfo>
				{itemCount ? (
					<AddContainer>
						<AmountContainer>
							<Icon onClick={() => manageCart(false)}>
								<Remove />
							</Icon>
							<Amount>{itemCount}</Amount>
							<Icon onClick={() => manageCart(true)}>
								<Add />
							</Icon>
						</AmountContainer>
					</AddContainer>
				) : (
					<Button onClick={() => manageCart(true)}>ADD TO CART</Button>
				)}
			</InfoContainer>
		</Container>
	);
}

export default ProductDetails;
