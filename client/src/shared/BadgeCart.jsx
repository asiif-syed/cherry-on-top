import React from 'react';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';

function BadgeCart(props) {
	return (
		<Badge badgeContent={props.count} color='primary'>
			<ShoppingCartOutlined
				style={{ fontSize: '25px', color: 'black' }}
				onClick={props.handleClick}
			/>
		</Badge>
	);
}

export default BadgeCart;
