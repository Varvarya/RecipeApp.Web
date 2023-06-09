import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {API_URL} from '../../consts/api';
import {MealRecipe} from '../../types/additional_types';
import {RecommendationModel} from './requestsModels';

const api = httpClient.getInstance(API_URL);

const getUserMealPlans = createAsyncThunk<void, { MealPlanId: number, FamilyId: number }, { rejectValue: APIError }>(
	'/getUserMealPlans',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/MealPlan', {params: data});
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const addMealPlan = createAsyncThunk<void, { familyId: number, mealPlanDays: MealRecipe[] }, { rejectValue: APIError }>(
	'/addMealPlan',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/MealPlan', {data});
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const generateMealPlan = createAsyncThunk<void, RecommendationModel, { rejectValue: APIError }>(
	'/generateMealPlan',
	async (data, {rejectWithValue}) => {
		const res = await api.get('/MealPlan/recommendation/' + data.externalUserId, {params: data});

		if (res.status == 200) {
			return res.data;
		} else {
			return rejectWithValue(getExceptionPayload(res));
		}
	}
);

export {getUserMealPlans, addMealPlan, generateMealPlan};
