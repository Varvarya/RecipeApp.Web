import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {loginModel, regisrationModel} from './requestsModels';
import {API_URL} from '../../consts/api';

const api = httpClient.getInstance(API_URL);

const loginAction = createAsyncThunk<void, loginModel, { rejectValue: APIError }>(
	'/login',
	async (data, {rejectWithValue}) => {
		const res = await api.post('/Auth/token', data);
		if (res.data.loginErrorCode === 100) {
			sessionStorage.setItem('token', res.data.token);
			return res.data;
		} else {
			return rejectWithValue(getExceptionPayload(res));
		}
	}
);

const registrationAction = createAsyncThunk<any, regisrationModel, any>(
	'/register',
	async (data, {rejectWithValue}) => {
		sessionStorage.removeItem('token');
		const res = await api.post('/User', data);
		console.log('Res ', res);

		if (res.status == 200) {
			return res.data;
		} else {
			return rejectWithValue(getExceptionPayload(res));
		}
	}
);

export {loginAction, registrationAction};
