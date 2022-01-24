import React from 'react';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
function Spinner(props) {
	const Container = styled.div`
		display: flex;
		justify-content: center;
		height: 20px;
		margin: ${props.margin || '10px'};
	`;
	return (
		<Container>
			<BeatLoader size={15} margin={2} loading={props.loading} />;
		</Container>
	);
}

export default Spinner;
