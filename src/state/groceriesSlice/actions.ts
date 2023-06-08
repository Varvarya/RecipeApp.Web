import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {IngredientType} from './requestsModels';
import {API_URL} from '../../consts/api';

const api = httpClient.getInstance(API_URL);

const analyzePhotoAction = createAsyncThunk<void, string | Blob, { rejectValue: APIError }>(
	'/recognize',
	async (data, {rejectWithValue}) => {
		try {
			const formData = new FormData();
			formData.append('image', data);

			const res = await api.post('/Ingredients/recognize-ingredients', formData, {
				headers: {
					Accept: 'text/plain',
					'Content-Type': 'multipart/form-data',
				},
			});
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const getIngredientsListAction = createAsyncThunk<void, string, { rejectValue: APIError }>(
	'/getIngredientsList',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/Ingredients', {params: {IngredientName: data}});
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const getStoredIngredientsAction = createAsyncThunk<{ storedIngredients: IngredientType[] }, string, { rejectValue: APIError }>(
	'/getStoredIngredients',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/StoredIngredient');
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const postStoredIngredientsAction = createAsyncThunk<boolean, IngredientType[], { rejectValue: APIError }>(
	'/postStoredIngredients',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/StoredIngredient', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const putStoredIngredientsAction = createAsyncThunk<boolean, IngredientType[], { rejectValue: APIError }>(
	'/putStoredIngredients',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.put('/StoredIngredient', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const deleteStoredIngredientsAction = createAsyncThunk<boolean, IngredientType[], { rejectValue: APIError }>(
	'/deleteStoredIngredients',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.delete('/StoredIngredient');
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {
	analyzePhotoAction,
	getIngredientsListAction,
	getStoredIngredientsAction,
	postStoredIngredientsAction,
	putStoredIngredientsAction,
	deleteStoredIngredientsAction
};
