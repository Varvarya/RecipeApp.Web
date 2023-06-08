import {configureStore} from '@reduxjs/toolkit';
import {getIngredientsListAction} from './actions';
import {httpClient} from '../api';
import {initialState as prevState} from './index';
import {API_URL} from '../../consts/api';

const api = httpClient.getInstance(API_URL);

describe('test getIngredientsListAction', () => {
	it('should set serachRes to action.payload.ingredients', async () => {
		const searchStr = 'apple';
		const getSpy = jest.spyOn(api, 'get').mockResolvedValueOnce({
			ingredients: [{
				'id': 0,
				'amount': 0,
				'name': 'string',
				'unit': 0
			}]
		});
		const store = configureStore({
			reducer: function (state = prevState, action) {
				switch (action.type) {
				case getIngredientsListAction.fulfilled:
					console.log(state);
					return {...state, searchRes: action.payload.ingredients};
				default:
					return state;
				}
			},
		});
		await store.dispatch(getIngredientsListAction(searchStr));
		expect(getSpy).toBeCalledWith('/Ingredients', {params: {IngredientName: searchStr}});
		const state = store.getState();
		expect(state).toEqual({
			...prevState, searchRes: [{
				'id': 0,
				'amount': 0,
				'name': 'string',
				'unit': 0
			}]
		});
	});
});



