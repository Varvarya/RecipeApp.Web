import {createSlice} from '@reduxjs/toolkit';
import {APIError, APIStatus} from '../types';
import {RootState} from '../store';
import {filterReceiptsAction} from './actions';
import {Receipt} from './requestsModels';

type StateType = {
	receipts?: Receipt[],
	status: APIStatus,
	token?: string,
	loading: boolean,
	error?: APIError,
}

const initialState: StateType = {
	receipts: [],
	status: APIStatus.IDLE,
	token: undefined,
	loading: false,
	error: undefined
};
export const receiptsSlice = createSlice({
	name: 'receipt',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(filterReceiptsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(filterReceiptsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.receipts = action.payload;
			})
			.addCase(filterReceiptsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				//state.error = action.error || undefined;
			});
	}
});

export default receiptsSlice.reducer;
