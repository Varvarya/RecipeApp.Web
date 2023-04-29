import axios from 'axios';

const api = axios.create({
	baseURL: 'https://recipeappwebapi.azurewebsites.net/api/',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});



export default api;
