import {createSlice, SerializedError} from '@reduxjs/toolkit';
import {loginAction, registrationAction} from './actions';
import {APIError, APIStatus} from '../types';
import {RootState} from '../store';

type StateType = {
	username?: string,
	status: APIStatus,
	token?: string,
	loading: boolean,
	error?: APIError | SerializedError,
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
				state.loading = true;
			})
			.addCase(loginAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
				if (action.payload.userInfo) state.username = action.payload.userInfo.userName;
			})
			.addCase(loginAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.loading = false;
				state.error = action.error || undefined;
			})
			.addCase(registrationAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(registrationAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(registrationAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				console.log('Reject reg ', action);
				state.loading = false;
				//state.error = action.payload;
				//state.error = action.error || undefined;
			});

	}
});

export default loginSlice.reducer;

const selectToken = (state: RootState) => ({token: state.login.token, error: state.login.error});
export {selectToken};
