import {createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {APIError, APIStatus} from '../types';
import {
	addUserForbiddenIngredientsAction,
	addUserForbiddenNutrientAction,
	deleteUserForbiddenIngredientsAction,
	deleteUserForbiddenNutrientAction,
	getNutrientsListAction,
	getUserForbiddenIngredientsAction,
	getUserForbiddenNutrientAction,
	updateUserForbiddenNutrientAction
} from './actions';
import {IngredientType} from '../groceriesSlice/requestsModels';
import {ForbiddenNutrientModel, Nutrient} from './requestsModels';

type StateType = {
    forbiddenIngredients?: IngredientType[],
    nutrients: Nutrient[]
    forbiddenNutrients?: ForbiddenNutrientModel[],
    status: APIStatus,
    loading: boolean,
    error?: APIError | SerializedError,
}

const initialState: StateType = {
	forbiddenIngredients: [],
	nutrients: [],
	status: APIStatus.IDLE,
	loading: false,
	error: undefined
};

export const forbiddenSlice = createSlice({
	name: 'forbidden',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNutrientsListAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getNutrientsListAction.fulfilled, (state, action: PayloadAction<{ nutrients: Nutrient[] } | void>) => {
				console.log(action.payload);
				state.status = APIStatus.FULFILLED;
				state.nutrients = action.payload?.nutrients || [];
				state.loading = false;
			})
			.addCase(getNutrientsListAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getUserForbiddenIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getUserForbiddenIngredientsAction.fulfilled, (state, action: PayloadAction<{ forbiddenIngredients: IngredientType[] } | void>) => {
				console.log(action.payload);
				state.status = APIStatus.FULFILLED;
				state.forbiddenIngredients = action.payload?.forbiddenIngredients || [];
				state.loading = false;
			})
			.addCase(getUserForbiddenIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(addUserForbiddenIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(addUserForbiddenIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenIngredients = [];
				state.loading = false;
			})
			.addCase(addUserForbiddenIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(deleteUserForbiddenIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(deleteUserForbiddenIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenIngredients = [];
				state.loading = false;
			})
			.addCase(deleteUserForbiddenIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getUserForbiddenNutrientAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getUserForbiddenNutrientAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenNutrients = action.payload.forbiddenNutrients;
				state.loading = false;
			})
			.addCase(getUserForbiddenNutrientAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(addUserForbiddenNutrientAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(addUserForbiddenNutrientAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenNutrients = [];
				state.loading = false;
			})
			.addCase(addUserForbiddenNutrientAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(updateUserForbiddenNutrientAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(updateUserForbiddenNutrientAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenNutrients = [];
				state.loading = false;
			})
			.addCase(updateUserForbiddenNutrientAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			}).addCase(deleteUserForbiddenNutrientAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(deleteUserForbiddenNutrientAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.forbiddenNutrients = [];
				state.loading = false;
			})
			.addCase(deleteUserForbiddenNutrientAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			});

	}
});

export default forbiddenSlice.reducer;
