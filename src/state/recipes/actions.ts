import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {queryParams, Recipe} from './requestsModels';
import {API_URL} from '../../consts/api';

const api = httpClient.getInstance(API_URL);

const filterRecipesAction = createAsyncThunk<any, queryParams, { rejectValue: APIError }>(
	'/recipes',
	async (params, {rejectWithValue}) => {
		try {
			const res = await api.get('/Recipe', {params});

			return res;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const saveRecipeToStorage = createAsyncThunk<Recipe, Recipe, { rejectValue: APIError }>(
	'/save_recipe',
	async (data, {rejectWithValue}) => {
		try {
			console.log(data);
			return data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const cookRecipe = createAsyncThunk<string, string, { rejectValue: APIError }>(
	'/cookRecipe',
	async (data, {rejectWithValue}) => {
		try {
			return await api.post('/Recipe/' + data + '/cook');
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {filterRecipesAction, saveRecipeToStorage, cookRecipe};
