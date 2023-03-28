import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import { APIError } from '../types';

const analyzePhotoAction = createAsyncThunk<any, any, {rejectValue: APIError}>(
	'/recognize',
	async (data, { rejectWithValue }) => {
		try {
			console.log(data);
			const formData = new FormData();
			formData.append('image', data);

			const res = await api.post('/Ingredients/recognize-ingredients', formData, {headers: {
				Accept: 'text/plain',
				'Content-Type': 'multipart/form-data',
			},});
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {analyzePhotoAction};
