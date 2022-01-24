import React, { useState } from 'react';
import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { validateEmail } from '../helpers/validationHelpers';

const Container = styled.div`
	height: 60vh;
	background-color: #fcf5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
const Title = styled.h1`
	font-size: 70px;
	margin-bottom: 20px;
`;

const Desc = styled.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
`;
const Error = styled.p`
	font-size: 16px;
	color: red;
	margin: 10px;
`;
const InputContainer = styled.div`
	width: 50%;
	height: 40px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
`;

const Input = styled.input`
	border: none;
	flex: 8;
	padding-left: 20px;
`;

const Button = styled.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
`;

const Newsletter = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const handleNewsLetter = () => {
		if (email && !errorMessage) {
			setEmail('');
			setMessage(true);
			setTimeout(() => setMessage(false), 5000);
		}
	};

	return (
		<Container>
			{message ? (
				<Desc>Thank you for subsciption, please check your mailbox.</Desc>
			) : (
				<>
					<Title>Newsletter</Title>
					<Desc>
						Get yummy baking tips and recipes, information related to our baking
						challenge programs.
					</Desc>
					<InputContainer>
						<Input
							placeholder='Your email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							onBlur={() => setErrorMessage(validateEmail(email))}
						/>
						<Button onClick={handleNewsLetter}>
							<Send />
						</Button>
					</InputContainer>
					<Error>{errorMessage}</Error>
				</>
			)}
		</Container>
	);
};

export default Newsletter;
