import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import { APIError } from '../types';
import {loginModel, regisrationModel} from './requestsModels';

const loginAction = createAsyncThunk<any, loginModel, {rejectValue: APIError}>(
	'/login',
	async (data, { rejectWithValue }) => {
		try {
			const res = await api.post('/Auth/token', data);
			console.log(res);
			if (res.data.loginErrorCode === 100) {
				sessionStorage.setItem('token', res.data.token);
				return res.data;
			} else {
				throw res.data.loginErrorCode;
			}

		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const registrationAction = createAsyncThunk<any, regisrationModel,{rejectValue: APIError}>(
	'/register',
	async (data, { rejectWithValue }) => {
		console.log(data);
		try {
			const res = await api.post('/User', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

export {loginAction, registrationAction};
