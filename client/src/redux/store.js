import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './reducers/cartReducer';
import productsReducer from './reducers/productsReducer';
import loginReducer from './reducers/loginReducer';
import actionWatcher from './actionWatcher';
import immutableTransform from 'redux-persist-transform-immutable';
// Combining multiple reducers
const rootReducer = combineReducers({
	cartReducer,
	productsReducer,
	loginReducer,
});

// Persist Configuration
const persistConfig = {
	transforms: [immutableTransform()],
	key: 'root',
	storage,
};

// Required to enable redux dev tools in the local enviornment
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializing Redux-Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Persisting the reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creates store with root reducer and integrates with middleware(redux-saga)
export const configureStore = () => {
	let store = createStore(
		persistedReducer,
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);
	store.runSaga = sagaMiddleware.run(actionWatcher);
	let persistor = persistStore(store);
	return { store, persistor };
};
