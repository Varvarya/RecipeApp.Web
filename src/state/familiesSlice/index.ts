import {createSlice} from '@reduxjs/toolkit';
import {addFamily, deleteFamily, editFamily, getUserFamilies} from './actions';
import {APIError, APIStatus} from '../types';
import {RootState} from '../store';
import {FamilyModel} from './requestsModels';

type StateType = {
    families: FamilyModel[],
    status: APIStatus,
    loading: boolean,
    error?: APIError,
}

const initialState: StateType = {
	families: [],
	status: APIStatus.IDLE,
	loading: false,
	error: undefined
};
export const familiesSlice = createSlice({
	name: 'families',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserFamilies.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getUserFamilies.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
				if (action.payload) state.families = action.payload.families;
			})
			.addCase(getUserFamilies.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.loading = false;
				//state.error = action.error || undefined;
			})
			.addCase(addFamily.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(addFamily.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(addFamily.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				//state.error = action.error || undefined;
			})
			.addCase(editFamily.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(editFamily.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(editFamily.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				//state.error = action.error || undefined;
			})
			.addCase(deleteFamily.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(deleteFamily.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(deleteFamily.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				//state.error = action.error || undefined;
			})
		;

	}
});

export default familiesSlice.reducer;

const selectToken = (state: RootState) => ({token: state.login.token, error: state.login.error});
export {selectToken};
