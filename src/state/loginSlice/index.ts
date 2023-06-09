import {createReducer, createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {loginAction, registrationAction} from './actions';
import {APIError, APIStatus} from '../types';
import {RootState} from '../store';
import {UserType} from './requestsModels';

type StateType = {
    user?: UserType,
    status: APIStatus,
    token?: string,
    loading: boolean,
    error?: APIError | SerializedError,
}

const initialState: StateType = {
	user: undefined,
	status: APIStatus.IDLE,
	token: undefined,
	loading: false,
	error: undefined
};

const login = createReducer(initialState, builder => {
	builder
		.addCase(loginAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(loginAction.fulfilled, (state, action: PayloadAction<{ userInfo: UserType } | void>) => {
			state.status = APIStatus.FULFILLED;
			state.loading = false;
			if (action.payload?.userInfo) state.user = action.payload?.userInfo;
		})
		.addCase(loginAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.loading = false;
			state.error = action.error || undefined;
		});
});

const register = createReducer(initialState, builder => {
	builder
		.addCase(registrationAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(registrationAction.fulfilled, (state, action) => {
			state.status = APIStatus.FULFILLED;
			state.loading = false;
		})
		.addCase(registrationAction.rejected, (state, action: any) => {
			state.status = APIStatus.REJECTED;
			state.loading = false;
			state.error = action.error || undefined;
		});
});
export const loginSlice = createSlice({
	name: 'login',
	initialState: initialState,
	reducers: {
		login: login,
		register: register,
	},
});

export default loginSlice.reducer;

const selectToken = (state: RootState) => ({token: state.login.token, error: state.login.error});
export {selectToken};
