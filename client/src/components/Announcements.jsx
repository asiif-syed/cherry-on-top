import React from 'react';
import styled from 'styled-components';

function Announcements() {
	const Container = styled.div`
		height: 35px;
		background-color: #00695c;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		font-weight: bold;
	`;
	return (
		<Container>
			Get 20% off on your first order. Use coupon FIRST_ORDER_20 to avail this
			offer.
		</Container>
	);
}

export default Announcements;
