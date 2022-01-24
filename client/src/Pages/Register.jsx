import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Error } from '../helpers/styleHelpers';
import { validateField } from '../helpers/validationHelpers';
import Spinner from '../components/Spinner';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.4),
			rgba(255, 255, 255, 0.4)
		),
		url('https://images.unsplash.com/photo-1613589524461-42663d531d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px;
	background-color: white;
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	border-radius: 10px;
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;
const Row = styled.div`
	display: flex;
	align-items: center;
`;
const Col = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;
const Div = styled.div`
	width: 100%;
	flex: 2
	display: flex;
	flex-direction: column;
`;
const LinkText = styled.div`
	margin: 10px;
`;

const Register = () => {
	const errorMsg = useSelector((state) => state.loginReducer.registerError);
	const registerSuccess = useSelector(
		(state) => state.loginReducer.registrationSuccess
	);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState({ value: '', error: '' });
	const [lastName, setLastName] = useState({ value: '', error: '' });
	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });
	const isLoading = useSelector((state) => state.productsReducer.isLoading);

	useEffect(() => {
		if (registerSuccess) {
			registerSuccess && navigate('/login');
			dispatch({
				type: 'register-error',
				message: '',
			});
		}
	}, [registerSuccess]);

	const [confirmPassword, setConfirmPassword] = useState({
		value: '',
		error: '',
	});
	const handleChange = (event) => {
		const { id, value } = event.target;
		switch (id) {
			case 'firstName':
				setFirstName({ ...firstName, value });
				break;
			case 'lastName':
				setLastName({ ...lastName, value });
				break;
			case 'email':
				setEmail({ ...email, value });
				break;
			case 'password':
				setPassword({ ...password, value });
				break;
			case 'confirmPassword':
				setConfirmPassword({ ...confirmPassword, value });
				break;
			default:
				break;
		}
		dispatch({
			type: 'register-error',
			message: '',
		});
	};
	const handleBlur = (event) => {
		const { id, value, name } = event.target;
		const error = validateField(name, value, password.value);
		switch (id) {
			case 'firstName':
				setFirstName({ value: value.trim(), error });
				break;
			case 'lastName':
				setLastName({ value: value.trim(), error });
				break;
			case 'email':
				setEmail({ value: value.trim(), error });
				break;
			case 'password':
				setPassword({ value: value.trim(), error });
				break;
			case 'confirmPassword':
				setConfirmPassword({ value: value.trim(), error });
				break;
		}
	};
	const handleRegister = (event) => {
		event.preventDefault();
		const data = [firstName, lastName, email, password, confirmPassword];
		const validData = data.every(
			(dataItem) => dataItem.value && !dataItem.error
		);
		if (validData) {
			setFirstName({ value: '', error: '' });
			setLastName({ value: '', error: '' });
			setEmail({ value: '', error: '' });
			setPassword({ value: '', error: '' });
			setConfirmPassword({ value: '', error: '' });
			dispatch({
				type: 'register-user',
				payload: {
					email: email.value,
					password: password.value,
					firstName: firstName.value,
					lastName: lastName.value,
					confirmPassword: confirmPassword.value,
					isAdmin: false,
				},
			});
		} else {
			alert('Please provide valid details.');
		}
	};
	return (
		<Container>
			<Wrapper>
				{errorMsg && <Error>{errorMsg}</Error>}
				<Title>REGISTER</Title>
				<Form>
					<Row>
						<Col>
							<Input
								placeholder='First Name'
								id='firstName'
								name='First Name'
								value={firstName.value}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Error>{firstName.error}</Error>
						</Col>
						<Col>
							<Input
								placeholder='Last Name'
								id='lastName'
								name='Last Name'
								value={lastName.value}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Error>{lastName.error}</Error>
						</Col>
					</Row>
					<Input
						placeholder='Email'
						id='email'
						name='Email'
						value={email.value}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<Error>{email.error}</Error>
					<Row>
						<Col>
							<Input
								placeholder='Password'
								id='password'
								name='Password'
								type='password'
								value={password.value}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Error>{password.error}</Error>
						</Col>
						<Col>
							<Input
								placeholder='Confirm Password'
								id='confirmPassword'
								name='Confirm Password'
								type='password'
								value={confirmPassword.value}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<Error>{confirmPassword.error}</Error>
						</Col>
					</Row>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					{isLoading ? (
						<Spinner loading={isLoading} />
					) : (
						<Row>
							<Button onClick={handleRegister}>REGISTER</Button>
							<LinkText>
								<strong>
									Already have account?{' '}
									<Link to='/login' className='text-success'>
										Login
									</Link>
								</strong>
							</LinkText>
						</Row>
					)}
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
