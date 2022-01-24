import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products';
import Register from './Pages/Register';
import Payments from './Pages/Payments';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import Cart from './Pages/Cart';
export const Router = (props) => {
	return (
		<>
			<Routes>
				<Route exact path='/register' element={<Register />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='/payments' element={<Payments />} />
				<Route exact path='/reset-password' element={<ResetPassword />} />
				<Route exact path='/shopping-cart' element={<Cart />} />
				{/* <Route exact path='/register' component={Authenticate} />
				<Route exact path='/reset-password' component={Authenticate} /> */}
				<Route path='/' element={<Home />} />
				<Route path='/menu/:category' element={<Products />} />
				<Route path='/:category/:item' element={<ProductDetails />} />
				{/* <Route exact path='/'> */}
				{/* <Redirect push to={'/home'} /> */}
				{/* </Route> */}
			</Routes>
		</>
	);
};
