import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				textAlign: 'center',
				marginTop: '15rem',
				marginLeft: '50rem',
				padding: '2rem',
			}}
			variant='info'
		>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
};

export default Loading;
