import axios, {AxiosInstance} from 'axios';
import {API_URL} from '../consts/api';

const httpClient = (() => {
	let instance: AxiosInstance;

	const API = (url: string) => {

		return axios.create({
			baseURL: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			validateStatus: function (status) {
				return status >= 200;
			}
		});
	};

	return {
		getInstance: (url: string) => {
			if (!instance) {
				instance = API(url);
			}
			return instance;
		}
	};
})();

const api = httpClient.getInstance(API_URL);

export {api, httpClient} ;
