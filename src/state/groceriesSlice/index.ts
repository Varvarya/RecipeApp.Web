import {createReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	analyzePhotoAction,
	deleteStoredIngredientsAction,
	getIngredientsListAction,
	getStoredIngredientsAction,
	postStoredIngredientsAction,
	putStoredIngredientsAction
} from './actions';
import {APIError, APIStatus} from '../types';
import {IngredientType} from './requestsModels';

export type StateType = {
    username?: string,
    status: APIStatus,
    loading: boolean,
    error?: APIError,

    storedGroceries: IngredientType [],
    searchRes: IngredientType [],
    recognizedGroceries: IngredientType[],
}

export const initialState: StateType = {
	status: APIStatus.IDLE,
	searchRes: [],
	loading: false,
	error: undefined,
	storedGroceries: [],
	recognizedGroceries: []
};

const analyzePhoto = createReducer(initialState, builder => {
	builder
		.addCase(analyzePhotoAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(analyzePhotoAction.fulfilled, (state, action: PayloadAction<{ ingredients: IngredientType[] } | void>) => {
			state.status = APIStatus.FULFILLED;
			state.recognizedGroceries = action.payload?.ingredients || [];
			state.loading = false;
		})
		.addCase(analyzePhotoAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});

const getIngredientsList = createReducer(initialState, builder => {
	builder
		.addCase(getIngredientsListAction.pending, (state) => {
			console.log(APIStatus.PENDING);
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(getIngredientsListAction.fulfilled, (state, action: PayloadAction<{ ingredients: IngredientType[] } | void>) => {
			console.log(APIStatus.FULFILLED);
			state.status = APIStatus.FULFILLED;
			state.searchRes = action.payload?.ingredients || [];
			state.loading = false;
		})
		.addCase(getIngredientsListAction.rejected, (state, action) => {
			console.log(APIStatus.REJECTED);
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});

const getStoredIngredients = createReducer(initialState, builder => {
	builder
		.addCase(getStoredIngredientsAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(getStoredIngredientsAction.fulfilled, (state, action) => {
			state.status = APIStatus.FULFILLED;
			state.storedGroceries = action.payload.storedIngredients;
			state.loading = false;
		})
		.addCase(getStoredIngredientsAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});

const postStoredIngredients = createReducer(initialState, builder => {
	builder
		.addCase(postStoredIngredientsAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(postStoredIngredientsAction.fulfilled, (state, action) => {
			state.status = APIStatus.FULFILLED;
			state.loading = false;
		})
		.addCase(postStoredIngredientsAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});

const putStoredIngredients = createReducer(initialState, builder => {
	builder
		.addCase(putStoredIngredientsAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(putStoredIngredientsAction.fulfilled, (state, action) => {
			state.status = APIStatus.FULFILLED;
			state.loading = false;
		})
		.addCase(putStoredIngredientsAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});

const deleteStoredIngredients = createReducer(initialState, builder => {
	builder
		.addCase(deleteStoredIngredientsAction.pending, (state) => {
			state.status = APIStatus.PENDING;
			state.loading = true;
		})
		.addCase(deleteStoredIngredientsAction.fulfilled, (state, action) => {
			state.status = APIStatus.FULFILLED;
			state.storedGroceries = [];
			state.loading = false;
		})
		.addCase(deleteStoredIngredientsAction.rejected, (state, action) => {
			state.status = APIStatus.REJECTED;
			state.error = action.payload;
			state.loading = false;
		});
});


export const groceriesSlice = createSlice({
	name: 'groceries',
	initialState: initialState,
	reducers:
        {
        	// analyzePhoto: analyzePhoto,
        	// getIngredientsList: getIngredientsList,
        	// getStoredIngredients: getStoredIngredients,
        	// postStoredIngredients: postStoredIngredients,
        	// putStoredIngredients: putStoredIngredients,
        	// deleteStoredIngredients: deleteStoredIngredients
        },

	extraReducers: (builder) => {
		builder
			.addCase(analyzePhotoAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(analyzePhotoAction.fulfilled, (state, action: PayloadAction<{ ingredients: IngredientType[] } | void>) => {
				state.status = APIStatus.FULFILLED;
				const res = action.payload?.ingredients || [];
				res.forEach((el) => el.amount = 1);
				state.recognizedGroceries = res || [];
				state.loading = false;
			})
			.addCase(analyzePhotoAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getIngredientsListAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getIngredientsListAction.fulfilled, (state, action: PayloadAction<{ ingredients: IngredientType[] } | void>) => {
				console.log(action.payload);
				state.status = APIStatus.FULFILLED;
				state.searchRes = action.payload?.ingredients || [];
				state.loading = false;
			})
			.addCase(getIngredientsListAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(getStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(getStoredIngredientsAction.fulfilled, (state, action) => {
				console.log(action.payload);
				state.status = APIStatus.FULFILLED;
				state.storedGroceries = action.payload.storedIngredients;
				state.loading = false;
			})
			.addCase(getStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			}).addCase(putStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(putStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(putStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(postStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(postStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(postStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(deleteStoredIngredientsAction.pending, (state) => {
				state.status = APIStatus.PENDING;
				state.loading = true;
			})
			.addCase(deleteStoredIngredientsAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.storedGroceries = [];
				state.loading = false;
			})
			.addCase(deleteStoredIngredientsAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				state.error = action.payload;
				state.loading = false;
			});
	}
});
export default groceriesSlice.reducer;
