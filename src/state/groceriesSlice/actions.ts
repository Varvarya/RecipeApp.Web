import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import { APIError } from '../types';

const analizePhotoAction = createAsyncThunk<any, any, {rejectValue: APIError}>(
	'/recognize',
	async (data, { rejectWithValue }) => {
		try {
			const res = await api.post('/Ingredients/recognize-ingredients', data, {headers: {
				Accept: 'text/plain',
				'Content-Type': 'multipart/form-data',
			},});
			sessionStorage.setItem('token', res.data.token);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {analizePhotoAction};
