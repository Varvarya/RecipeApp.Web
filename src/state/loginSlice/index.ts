import {createSlice} from '@reduxjs/toolkit';
import {loginAction} from './actions';
import {APIError, APIStatus} from '../types';

type StateType = {
	username?: string,
	status: APIStatus,
	token?: string,
	loading: boolean,
	error?: APIError,
}

const initialState: StateType = {
	username: '',
	status: APIStatus.IDLE,
	token: undefined,
	loading: false,
	error: undefined
};

export const loginSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(loginAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.username = action.payload.userInfo.username;
			})
			.addCase(loginAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
			});

	}
});

export default loginSlice.reducer;
