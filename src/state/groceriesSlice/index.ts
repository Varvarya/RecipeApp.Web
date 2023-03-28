import {createSlice} from '@reduxjs/toolkit';
import {analyzePhotoAction} from './actions';
import {APIError, APIStatus} from '../types';

type StateType = {
	username?: string,
	status: APIStatus,
	loading: boolean,
	error?: APIError,

	groceries: {confidence: number, class: string} [],
}

const initialState: StateType = {
	status: APIStatus.IDLE,
	loading: false,
	error: undefined,
	groceries: []
};

export const groceriesSlice = createSlice({
	name: 'groceries',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(analyzePhotoAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(analyzePhotoAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.groceries = action.payload.ingridients;
			})
			.addCase(analyzePhotoAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
			});
	}
});

export default groceriesSlice.reducer;
