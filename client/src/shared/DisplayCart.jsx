import React from 'react';
import {
	ShoppingCartOutlined,
	RemoveCircleOutline,
	PlusOneOutlined,
} from '@material-ui/icons';
import styled from 'styled-components';
import BadgeCart from '../shared/BadgeCart';
const Icon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	margin: 10px;
	transition: all 0.5s ease;
	&:hover {
		background-color: #e9f5f5;
		transform: scale(1.1);
	}
`;
function DisplayCart({ itemCount, manageCart }) {
	const handleClick = (event, status) => {
		event.stopPropagation();
		event.preventDefault();
		manageCart(status);
	};
	return itemCount ? (
		<>
			<Icon onClick={(event) => handleClick(event, false)}>
				<RemoveCircleOutline />
			</Icon>
			<Icon>
				<BadgeCart count={itemCount} />
			</Icon>
			<Icon onClick={(event) => handleClick(event, true)}>
				<PlusOneOutlined />
			</Icon>
		</>
	) : (
		<Icon onClick={(event) => handleClick(event, true)}>
			<ShoppingCartOutlined />
		</Icon>
	);
}

export default DisplayCart;
