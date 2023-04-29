import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import { APIError } from '../types';
import { queryParams } from './requestsModels';

const filterReceiptsAction = createAsyncThunk<any, queryParams, {rejectValue: APIError}>(
	'/receipts',
	async (params, { rejectWithValue }) => {
		try {
			const res = await api.get('/Recipe', {params});


		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {filterReceiptsAction};
