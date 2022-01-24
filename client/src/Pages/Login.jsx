import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { validateField } from '../helpers/validationHelpers';
import { Error } from '../helpers/styleHelpers';
import Spinner from '../components/Spinner';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://images.unsplash.com/photo-1613589524461-42663d531d5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 25%;
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
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	border-radius: 10px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
`;

const Row = styled.div`
	display: flex;
	align-items: center;
`;
const LinkText = styled.div`
	margin: 10px;
`;

const Login = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState({ value: '', error: '' });
	const [password, setPassword] = useState({ value: '', error: '' });
	const errorMsg = useSelector((state) => state.loginReducer.loginError);
	const token = useSelector((state) => state.loginReducer.userData.token);
	const isLoading = useSelector((state) => state.productsReducer.isLoading);
	useEffect(() => {
		token && history.go(-1);
	}, [token]);

	const handleChange = (event) => {
		const { id, value } = event.target;
		switch (id) {
			case 'email':
				setEmail({ ...email, value });
				break;
			case 'password':
				setPassword({ ...password, value });
				break;
			default:
				break;
		}
		dispatch({
			type: 'login-error',
			message: '',
		});
	};
	const handleBlur = (event) => {
		const { id, value, name } = event.target;
		const error = validateField(name, value);
		switch (id) {
			case 'email':
				setEmail({ value: value.trim(), error });
				break;
			case 'password':
				setPassword({ value: value.trim(), error });
				break;
			default:
				break;
		}
	};
	const handleLogin = (event) => {
		event.preventDefault();
		const data = [email, password];
		const validData = data.every(
			(dataItem) => dataItem.value && !dataItem.error
		);
		if (validData) {
			setEmail({ value: '', error: '' });
			setPassword({ value: '', error: '' });
			dispatch({
				type: 'user-login',
				payload: { email: email.value, password: password.value },
			});
		} else {
			alert('Please provide valid details.');
		}
	};
	return (
		<Container>
			<Wrapper>
				{errorMsg && <Error>{errorMsg}</Error>}
				<Title>LOGIN</Title>
				<Form>
					<Input
						placeholder='Email'
						id='email'
						name='Email'
						value={email.value}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<Error>{email.error}</Error>
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
					{isLoading ? (
						<Spinner loading={isLoading} />
					) : (
						<>
							<Row>
								<Button onClick={handleLogin}>LOGIN</Button>
								<LinkText>
									<strong>
										Already have account?{' '}
										<Link to='/register' className='text-success'>
											Register
										</Link>
									</strong>
								</LinkText>
							</Row>
							<Row>
								<LinkText>
									<strong>
										Forgot Password?{' '}
										<Link to='/reset-password' className='text-success'>
											Reset Password
										</Link>
									</strong>
								</LinkText>
							</Row>
						</>
					)}
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
