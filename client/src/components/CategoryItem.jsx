import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	margin: 20px;
	height: 50vh;
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Info = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h1`
	color: white;
	margin-bottom: 20px;
`;

const Button = styled.button`
	border: none;
	padding: 10px;
	background-color: white;
	color: gray;
	cursor: pointer;
	font-weight: 600;
`;
function CategoryItem({ item }) {
	const navigate = useNavigate();
	return (
		<Container>
			<Image src={item.img} />
			<Info>
				<Title>{item.title}</Title>
				<Button onClick={() => navigate(`/menu/${item.category}`)}>
					ORDER NOW
				</Button>
			</Info>
		</Container>
	);
}

export default CategoryItem;
