import { takeLatest } from 'redux-saga/effects';
import {
	getProductsSaga,
	loginSaga,
	registerSaga,
	resetPasswordSaga,
	ordersSaga,
} from './sagas';

export default function* actionWatcher() {
	yield takeLatest('get-products', getProductsSaga);
	yield takeLatest('user-login', loginSaga);
	yield takeLatest('register-user', registerSaga);
	yield takeLatest('reset-password', resetPasswordSaga);
	yield takeLatest('create-order', ordersSaga);
	// yield takeLatest('get-users-list', getUsersSaga);
	// yield takeLatest('save-food-details', addFoodEntrySaga);
	// yield takeLatest('get-food-details', getFoodEntriesSaga);
	// yield takeLatest('get-filtered-data', getFilteredEntriesSaga);
	// yield takeLatest('delete-entry', deleteFoodEntrySaga);
	// yield takeLatest('update-entry', updateFoodEntrySaga);
}
