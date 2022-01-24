import React from 'react';
import { Router } from './routes';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Announcements from './components/Announcements';
import Newsletter from './components/NewsLetter';

const App = () => {
	const isLoading = useSelector((state) => state.productsReducer.isLoading);
	return (
		<div>
			<Announcements />
			<NavBar />
			<Router />
			{!isLoading && (
				<>
					<Newsletter />
					<Footer />
				</>
			)}
		</div>
	);
};

export default App;
