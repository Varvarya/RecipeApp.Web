import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import groceriesReducer from './groceriesSlice';
import familiesReducer from './familiesSlice';
import forbiddenReducer from './forbiddenSlice';
import mealPlanReducer from './meal_plan';
import recipesReducer from './recipes';


const store = configureStore({
	reducer: {
		login: loginReducer,
		groceries: groceriesReducer,
		families: familiesReducer,
		forbidden: forbiddenReducer,
		mealPlan: mealPlanReducer,
		recipes: recipesReducer
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type StoreType = typeof store;

export default store;
