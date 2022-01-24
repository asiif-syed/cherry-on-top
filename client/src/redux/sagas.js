import { get, post, putCall } from '../helpers/axiosHelpers';
import { call, put } from 'redux-saga/effects';
export function* getProductsSaga(action) {
	const { query } = action;
	const url = query
		? `${process.env.REACT_APP_BASE_URL}/products/?category=${query}`
		: `${process.env.REACT_APP_BASE_URL}/products`;
	yield put({
		type: 'is-loading',
		isLoading: true,
	});
	try {
		const result = yield get(url);
		if (result.status === 200) {
			yield put({
				type: 'update-products',
				payload: { data: result.data, category: query },
			});
		}
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	}
}
export function* loginSaga(action) {
	const url = `${process.env.REACT_APP_BASE_URL}/auth/login`;
	yield put({
		type: 'is-loading',
		isLoading: true,
	});
	try {
		const { email, password } = action.payload;
		const result = yield post(url, { email, password });
		debugger;
		if (result.status === 201) {
			localStorage.setItem('token', result.data.token);
			yield put({
				type: 'login',
				payload: { ...result.data },
			});
		}
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: 'login-error',
			message:
				err?.data?.error?.message || 'Something went wrong, please try again.',
		});
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	}
}
export function* registerSaga(action) {
	const url = `${process.env.REACT_APP_BASE_URL}/auth/register`;
	yield put({
		type: 'is-loading',
		isLoading: true,
	});
	try {
		const result = yield post(url, action.payload);
		debugger;
		if (result.status === 201) {
			yield put({
				type: 'registration-success',
				message: '.',
			});
		}
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: 'register-error',
			message:
				err?.data?.error?.message || 'Something went wrong, please try again.',
		});
		debugger;
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	}
}
export function* resetPasswordSaga(action) {
	const url = `${process.env.REACT_APP_BASE_URL}/user/reset-password`;
	yield put({
		type: 'is-loading',
		isLoading: true,
	});
	try {
		const result = yield putCall(url, action.payload);
		if (result.status === 201) {
			yield put({
				type: 'reset-success',
				message: '.',
			});
		}
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: 'reset-pwd-error',
			message:
				err?.data?.error?.message || 'Something went wrong, please try again.',
		});
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	}
}
export function* ordersSaga(action) {
	const url = `${process.env.REACT_APP_BASE_URL}/orders`;
	yield put({
		type: 'is-loading',
		isLoading: true,
	});
	try {
		const result = yield post(url, action.payload);
		if (result.status === 201) {
			yield put({
				type: 'update-order',
				order: result.data.orders,
			});
		}
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: 'reset-pwd-error',
			message:
				err?.data?.error?.message || 'Something went wrong, please try again.',
		});
		yield put({
			type: 'is-loading',
			isLoading: false,
		});
	}
}
