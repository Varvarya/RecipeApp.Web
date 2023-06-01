import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import getExceptionPayload from '../errors';
import {APIError} from '../types';
import {addFamiliesModel, addFamilyMemberModel, getUserFamiliesModel} from './requestsModels';

const getUserFamilies = createAsyncThunk<getUserFamiliesModel, void, { rejectValue: APIError }>(
	'/getFamilies',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.get('/Family');
			console.log(res);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const addFamily = createAsyncThunk<boolean, addFamiliesModel, { rejectValue: APIError }>(
	'/addFamily',
	async (data, {rejectWithValue}) => {
		console.log(data);
		try {
			const res = await api.post('/Family', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const editFamily = createAsyncThunk<boolean, addFamiliesModel, { rejectValue: APIError }>(
	'/editFamily',
	async (data, {rejectWithValue}) => {
		console.log(data);
		try {
			const res = await api.put('/Family', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const deleteFamily = createAsyncThunk<boolean, number, { rejectValue: APIError }>(
	'/deleteFamily',
	async (familyId, {rejectWithValue}) => {
		try {
			const res = await api.delete('/Family/' + familyId);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const addFamilyMember = createAsyncThunk<boolean, addFamilyMemberModel, { rejectValue: APIError }>(
	'/addFamilyMember',
	async (data, {rejectWithValue}) => {
		try {
			const res = await api.post('/FamilyMember', data);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

const deleteFamilyMember = createAsyncThunk<boolean, number, { rejectValue: APIError }>(
	'/deleteFamilyMember',
	async (familyMemberId, {rejectWithValue}) => {
		try {
			const res = await api.delete('/FamilyMember/' + familyMemberId);
			return res.data;
		} catch (ex) {
			return rejectWithValue(getExceptionPayload(ex));
		}
	}
);

export {getUserFamilies, addFamily, editFamily, deleteFamily, addFamilyMember, deleteFamilyMember};
