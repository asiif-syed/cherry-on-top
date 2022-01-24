import React from 'react';
import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';

const Container = styled.div`
	display: grid;
	grid-template-columns: 4 4 4;
	padding: 20px;
	margin: 40px 5px 0 5px;
`;
const Header = styled.h1`
	height: 40px;
	margin: 0px 20px;
	background-color: #006064;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
	font-weight: bold;
	grid-column: 1 /4;
`;
function Category() {
	return (
		<>
			<Container>
				<Header>OUR CATALOGUE</Header>
				{categories.map((item) => (
					<CategoryItem item={item} key={item.id} />
				))}
			</Container>
		</>
	);
}

export default Category;
