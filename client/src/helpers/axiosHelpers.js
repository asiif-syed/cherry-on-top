import axios from 'axios';

axios.interceptors.request.use((req) => {
	// Configuring interceptor to include token in 'Authorization' header
	const token = localStorage.getItem('token');
	return new Promise((resolve) => {
		req.headers.Authorization = `Bearer ${token}`;
		resolve(req);
	});
});

axios.interceptors.response.use(function (response) {
	return response;
});
export const get = async (url) => {
	// Get call instance
	return axios
		.get(url)
		.then((response) => response)
		.catch((error) => {
			throw error.response;
		});
};
export const post = async (url, data) => {
	// Post call instance
	return axios
		.post(url, data)
		.then((response) => response)
		.catch((error) => {
			throw error.response;
		});
};

export const putCall = async (url, data) => {
	// Put call instance
	return axios
		.put(url, data)
		.then((response) => response)
		.catch((error) => {
			throw error.response;
		});
};
export const deleteCall = async (url) => {
	// Delete call instance
	return axios
		.delete(url)
		.then((response) => response)
		.catch((error) => {
			throw error.response;
		});
};

// export const userRequest = axios.create({
// 	baseURL: process.env.REACT_APP_BASE_URL,
// 	header: { token: `Bearer ${TOKEN}` },
// });
