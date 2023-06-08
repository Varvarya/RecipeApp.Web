import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpClient} from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {queryParams} from './requestsModels';
import {API_URL} from '../../consts/api';

const api = httpClient.getInstance(API_URL);

const filterReceiptsAction = createAsyncThunk<any, queryParams, { rejectValue: APIError }>(
	'/receipts',
	async (params, {rejectWithValue}) => {
		try {
			const res = await api.get('/Recipe', {params});


		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);


export {filterReceiptsAction};
