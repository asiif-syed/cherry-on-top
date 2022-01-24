import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Search } from '@material-ui/icons';
import TextInput from '../shared/TextInput';
import BadgeCart from '../shared/BadgeCart';

const Container = styled.div`
	height: 60px;
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const Left = styled.div`
	display: flex;
	flex: 1;
`;
const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`;
const Center = styled.div`
	flex: 1;
	text-align: center;
`;
const Logo = styled.h1`
	font-weight: bold;
	cursor: pointer;
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-right: 35px;
`;
const MenuItem = styled.div`
	font-size: 20px;
	cursor: pointer;
	margin-left: 25px;
`;
function NavBar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartCount = useSelector((state) => state.cartReducer.cart.count);
	const token = useSelector((state) => state.loginReducer.userData.token);
	const handleLogout = (event) => {
		event.preventDefault();
		dispatch({
			type: 'logout',
		});
		dispatch({
			type: 'empty-cart',
		});
	};
	return (
		<Container className='container'>
			<Wrapper>
				<Left>
					{/* <SearchContainer>
						<TextInput />
						<Search style={{ fontSize: '20px', color: 'gray' }} />
					</SearchContainer> */}
				</Left>
				<Center>
					<Logo onClick={() => navigate('/')}>CHERRY ON TOP</Logo>
				</Center>
				<Right>
					<MenuItem>
						{!token ? (
							<Link to='/login' style={{ textDecoration: 'none' }}>
								LOGIN
							</Link>
						) : (
							<Link
								to='/'
								style={{ textDecoration: 'none' }}
								onClick={handleLogout}
							>
								LOGOUT
							</Link>
						)}
					</MenuItem>
					<MenuItem>
						<BadgeCart
							count={cartCount}
							handleClick={() => navigate('/shopping-cart')}
						/>
					</MenuItem>
				</Right>
			</Wrapper>
		</Container>
	);
}

export default NavBar;
