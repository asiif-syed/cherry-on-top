import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { configureStore } from './redux/store';

// Returns the redux store
const { store, persistor } = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<PersistGate persistor={persistor}>
					<App />
				</PersistGate>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
