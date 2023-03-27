import {createSlice} from '@reduxjs/toolkit';
import {analizePhotoAction} from './actions';
import {APIError, APIStatus} from '../types';

type StateType = {
	username?: string,
	status: APIStatus,
	loading: boolean,
	error?: APIError,

	data: any,
}

const initialState: StateType = {
	status: APIStatus.IDLE,
	loading: false,
	error: undefined,
	data: null
};

export const groceriesSlice = createSlice({
	name: 'groceries',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(analizePhotoAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(analizePhotoAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.data = action.payload.data;
			})
			.addCase(analizePhotoAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
			});
	}
});

export default groceriesSlice.reducer;
