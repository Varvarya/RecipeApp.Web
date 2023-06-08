import {httpClient} from './api';
import {StoreType} from './store';
import {API_URL} from '../consts/api';


const api = httpClient.getInstance(API_URL);
const interceptor = (store: StoreType) => {
	api.interceptors.request.use(
		(config) => {
			const token = sessionStorage.getItem('token');
			if (token) {
				config.headers['Authorization'] = 'Bearer ' + token;  // for Spring Boot back-end
				config.headers['x-access-token'] = token; // for Node.js Express back-end
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	const {dispatch} = store;

	api.interceptors.response.use(
		(next) => {
			return Promise.resolve(next);
		},
		(err) => {
			const originalConfig = err.config;

			// if (originalConfig.url !== '/auth/signin' && err.response) {
			// 	// Access Token was expired
			// 	if (err.response.status === 401 && !originalConfig._retry) {
			// 		originalConfig._retry = true;
			//
			// 		try {
			// 			const rs = await axiosInstance.post('/auth/refreshtoken', {
			// 				refreshToken: TokenService.getLocalRefreshToken(),
			// 			});
			//
			// 			const {accessToken} = rs.data;
			//
			// 			dispatch(refreshToken(accessToken));
			// 			TokenService.updateLocalAccessToken(accessToken);
			//
			// 			return axiosInstance(originalConfig);
			// 		} catch (_error) {
			// 			return Promise.reject(_error);
			// 		}
			// 	}
			// }
		}
	);
};
export default {
	interceptor,
};
