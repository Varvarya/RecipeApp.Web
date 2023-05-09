import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import groceriesReducer from './groceriesSlice';
import familiesReducer from './familiesSlice';

const store = configureStore({
	reducer: {
		login: loginReducer,
		groceries: groceriesReducer,
		families: familiesReducer
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type StoreType = typeof store;

export default store;
