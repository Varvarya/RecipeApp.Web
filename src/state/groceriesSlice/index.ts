import {createSlice} from '@reduxjs/toolkit';
import {
	analyzePhotoAction,
	deleteStoredIngredientsAction,
	getIngredientsListAction,
	getStoredIngredientsAction,
	postStoredIngredientsAction,
	putStoredIngredientsAction
} from './actions';
import {APIError, APIStatus} from '../types';
import { IngredientType } from './requestsModels';

type StateType = {
	username?: string,
	status: APIStatus,
	loading: boolean,
	error?: APIError,

	groceries: IngredientType [],
	searchRes: IngredientType [],
	recognizedGroceries: IngredientType[],
}

const initialState: StateType = {
	status: APIStatus.IDLE,
	searchRes: [],
	loading: false,
	error: undefined,
	groceries: [],
	recognizedGroceries: []
};

export const groceriesSlice = createSlice({
	name: 'groceries',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(analyzePhotoAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(analyzePhotoAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.recognizedGroceries = action.payload.ingridients;
				state.loading = false;
			})
			.addCase(analyzePhotoAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getIngredientsListAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getIngredientsListAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.searchRes = action.payload.ingredients;
				state.loading = false;
			})
			.addCase(getIngredientsListAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.groceries = action.payload.storedIngredients;
				state.loading = false;
			})
			.addCase(getStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(postStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(postStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.groceries = [];
				state.loading = false;
			})
			.addCase(postStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(putStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(putStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.groceries = [];
				state.loading = false;
			})
			.addCase(putStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(deleteStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(deleteStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.groceries = [];
				state.loading = false;
			})
			.addCase(deleteStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			});
	}
});

export default groceriesSlice.reducer;
