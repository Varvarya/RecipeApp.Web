import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {API_URL} from '../../consts/api';
import {ForbiddenNutrientModel} from './requestsModels';

const api = httpClient.getInstance(API_URL);

const getNutrientsListAction = createAsyncThunk<void, void, { rejectValue: APIError }>(
	'/getNutrientsList',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/Nutrient');
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const getUserForbiddenIngredientsAction = createAsyncThunk<void, string, { rejectValue: APIError }>(
	'/getUserForbiddenIngredientsAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/ForbiddenIngredient/' + data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const addUserForbiddenIngredientsAction = createAsyncThunk<void, { ingredientId: number, externalUserId: number }, { rejectValue: APIError }>(
	'/addUserForbiddenIngredientsAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/ForbiddenIngredient', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const deleteUserForbiddenIngredientsAction = createAsyncThunk<void, { ingredientId: number }, { rejectValue: APIError }>(
	'/deleteUserForbiddenIngredientsAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.delete('/ForbiddenIngredient' + data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const getUserForbiddenNutrientAction = createAsyncThunk<{ forbiddenNutrients: ForbiddenNutrientModel[] }, string, { rejectValue: APIError }>(
	'/getUserForbiddenNutrientAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/ForbiddenNutrient/' + data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const addUserForbiddenNutrientAction = createAsyncThunk<void, ForbiddenNutrientModel, { rejectValue: APIError }>(
	'/addUserForbiddenNutrientAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/ForbiddenNutrient', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const updateUserForbiddenNutrientAction = createAsyncThunk<void, ForbiddenNutrientModel, { rejectValue: APIError }>(
	'/updateUserForbiddenNutrientAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/ForbiddenNutrient', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const deleteUserForbiddenNutrientAction = createAsyncThunk<void, { forbiddenNutrientId: number }, { rejectValue: APIError }>(
	'/deleteUserForbiddenNutrientAction',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.delete('/ForbiddenNutrient' + data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

export {
	getNutrientsListAction,
	addUserForbiddenIngredientsAction,
	getUserForbiddenIngredientsAction,
	deleteUserForbiddenIngredientsAction,
	addUserForbiddenNutrientAction,
	updateUserForbiddenNutrientAction,
	getUserForbiddenNutrientAction,
	deleteUserForbiddenNutrientAction
};
