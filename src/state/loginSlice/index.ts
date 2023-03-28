import {createSlice} from '@reduxjs/toolkit';
import {loginAction, registrationAction} from './actions';
import {APIError, APIStatus} from '../types';
import {InternalError} from '../errors';

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
				if (action.payload.userInfo) state.username = action.payload.userInfo.userName;
			})
			.addCase(loginAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				console.log(action);
				//state.error = action.error || undefined;
			})
			.addCase(registrationAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(registrationAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.username = action.payload.userInfo.username;
			})
			.addCase(registrationAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				console.log(action);
				//state.error = action.error || undefined;
			});

	}
});

export default loginSlice.reducer;
