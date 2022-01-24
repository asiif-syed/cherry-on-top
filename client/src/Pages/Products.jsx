import React from 'react';
import Spinner from '../components/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductItem from '../components/ProductItem';

const Container = styled.div`
	display: grid;
	grid-template-columns: 25% 25% 25% 25%;
	padding: 20px;
	margin: 40px 5px 0 5px;
`;
function Products() {
	const params = useParams();
	const dispatch = useDispatch();
	const category = params.category;
	const products = useSelector(
		(state) => state.productsReducer.products[category]?.[0]
	);
	const isLoading = useSelector((state) => state.productsReducer.isLoading);
	const [menuItems, setMenuItems] = React.useState([]);
	React.useEffect(() => {
		if (products?.length > 1) {
			setMenuItems(products);
		} else {
			dispatch({
				type: 'get-products',
				query: category,
			});
		}
	}, [products]);
	return isLoading ? (
		<Spinner margin='20rem' />
	) : (
		<Container>
			{menuItems.map((item) => (
				<ProductItem item={item} key={item._id} category={params.category} />
			))}
		</Container>
	);
}

export default Products;
