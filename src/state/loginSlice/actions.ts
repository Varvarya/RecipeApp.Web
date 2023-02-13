import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import { APIError } from '../types';

const loginAction = createAsyncThunk<any, void, {rejectValue: APIError}>(
	'/login',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('/login');

			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

export {loginAction};
