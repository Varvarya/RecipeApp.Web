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
				if (action.payload.userInfo) state.username = action.payload.userInfo.userName;
			})
			.addCase(filterReceiptsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				console.log(action);
				//state.error = action.error || undefined;
			});
	}
});

export default loginSlice.reducer;

const selectToken = (state: RootState) => ({token: state.login.token, error: state.login.error});
export {selectToken};
