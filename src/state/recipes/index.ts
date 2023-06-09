import {createSlice} from '@reduxjs/toolkit';
import {APIError, APIStatus} from '../types';
import {Recipe} from './requestsModels';
import {filterRecipesAction} from './actions';

type StateType = {
    recipes?: Recipe[],
    status: APIStatus,
    loading: boolean,
    error?: APIError,
}

const initialState: StateType = {
	recipes: [],
	status: APIStatus.IDLE,
	loading: false,
	error: undefined
};
export const receiptsSlice = createSlice({
	name: 'recipes',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(filterRecipesAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(filterRecipesAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				console.log(action.payload.data);
				if (action.payload) state.recipes = action.payload.data.recipes;
			})
			.addCase(filterRecipesAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				//state.error = action.error || undefined;
			});
	}
});

export default receiptsSlice.reducer;
