import {createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {addMealPlan, generateMealPlan, getUserMealPlans} from './actions';
import {APIError, APIStatus} from '../types';
import {MealPlan} from '../../types/additional_types';

type StateType = {
    status: APIStatus,
    generated?: MealPlan,
    mealPlans: MealPlan[],
    loading: boolean,
    error?: APIError | SerializedError,
}

const initialState: StateType = {
	mealPlans: [],
	status: APIStatus.IDLE,
	loading: false,
	error: undefined
};

export const mealPlanSlice = createSlice({
	name: 'mealPlans',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserMealPlans.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getUserMealPlans.fulfilled, (state, action: PayloadAction<{ mealPlans: MealPlan[] } | void>) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
				if (action.payload?.mealPlans) state.mealPlans = action.payload?.mealPlans;
			})
			.addCase(getUserMealPlans.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.loading = false;
				state.error = action.error || undefined;
			})
			.addCase(addMealPlan.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(addMealPlan.fulfilled, (state, action: PayloadAction<void>) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(addMealPlan.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.loading = false;
				state.error = action.error || undefined;
			})
			.addCase(generateMealPlan.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(generateMealPlan.fulfilled, (state, action: PayloadAction<MealPlan | void>) => {
				state.status = APIStatus.FULFILLED;
				state.generated = action.payload ? action.payload : undefined;
				if (action.payload) state.mealPlans.push(action.payload);
				state.loading = false;
			})
			.addCase(generateMealPlan.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.loading = false;
				state.error = action.error || undefined;
			});

	}
});

export default mealPlanSlice.reducer;
