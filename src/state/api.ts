import axios from 'axios';

const api = axios.create({
	baseURL: 'https://localhost:7261/api/',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});



export default api;
