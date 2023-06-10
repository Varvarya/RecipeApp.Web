import {createSlice} from '@reduxjs/toolkit';
import {APIError, APIStatus} from '../types';
import {Recipe} from './requestsModels';
import {cookRecipe, filterRecipesAction, saveRecipeToStorage} from './actions';

type StateType = {
    recipes?: Recipe[],
    chosenRecipe?: Recipe,
    status: APIStatus,
    loading: boolean,
    error?: APIError,
}

const initialState: StateType = {
	recipes: [],
	chosenRecipe: {
		'ingredientsMatchingPercentage': 0,
		'id': 7,
		'title': 'Chili Diablo Steak and Pasta',
		'image': 'https://spoonacular.com/recipeImages/179425-556x370.jpg',
		'calories': 547.22,
		'carbs': 66.3,
		'fat': 13.13,
		'protein': 39.99,
		'readyInMinutes': 52,
		'vegan': false,
		'healthy': false,
		'season': 4,
		'servings': 6,
		'summary': 'Chili Diablo Steak and Pasta might be just the <b>American</b> recipe you are searching for. This main course has <b>547 calories</b>, <b>40g of protein</b>, and <b>13g of fat</b> per serving. This recipe serves 6 and costs $2.82 per serving. A mixture of black beans, chili sauce, adobo sauce from chipotle chilies, and a handful of other ingredients are all it takes to make this recipe so flavorful. 1 person has made this recipe and would make it again. From preparation to the plate, this recipe takes about <b>52 minutes</b>. It is brought to you by Betty Crocker. It is a good option if you\'re following a <b>dairy free</b> diet. <b>The Super Bowl</b> will be even more special with this recipe. With a spoonacular <b>score of 70%</b>, this dish is pretty good. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/chili-diablo-steak-and-pasta-171708">Chili Diablo Steak and Pasta</a>, <a href="https://spoonacular.com/recipes/sunnys-diablo-diablo-diablo-burger-772924">Sunny\'s Diablo Diablo Diablo Burger</a>, and <a href="https://spoonacular.com/recipes/skirt-steak-diablo-84118">Skirt Steak Diablo</a>.',
		'dishType': 3,
		'recipeSteps': [
			{
				'id': 127,
				'description': 'Cook bacon in 10-inch nonstick skillet over medium heat, stirring occasionally, until crisp. Stir in onion and bell pepper. Cook 2 to 3 minutes, stirring occasionally, until crisp-tender. Stir in chipotle chili and adobo sauce. Cook and stir 1 minute. Stir in chili sauce and broth.',
				'order': 1
			},
			{
				'id': 128,
				'description': 'Heat to boiling; reduce heat. Simmer 5 minutes, stirring occasionally. Stir in beans; heat through.',
				'order': 2
			},
			{
				'id': 129,
				'description': 'Cook and drain pasta as directed on package.',
				'order': 3
			},
			{
				'id': 130,
				'description': 'While pasta is cooking, heat coals or gas grill for direct heat.',
				'order': 4
			},
			{
				'id': 131,
				'description': 'Sprinkle beef with garlic pepper, salt and chili powder. Grill beef 4 to 6 inches from medium heat 8 to 12 minutes for medium doneness, turning once.',
				'order': 5
			},
			{
				'id': 132,
				'description': 'To serve, toss pasta with about 1 cup sauce.',
				'order': 6
			},
			{
				'id': 133,
				'description': 'Cut beef across grain into thin slices; arrange over pasta mixture.',
				'order': 7
			},
			{
				'id': 134,
				'description': 'Drizzle and serve with remaining sauce.',
				'order': 8
			},
			{
				'id': 135,
				'description': 'Garnish with avocado and cilantro.',
				'order': 9
			}
		],
		'ingredients': [
			{
				'id': 73,
				'amount': 201,
				'name': 'avocado',
				'unit': 1
			},
			{
				'id': 74,
				'amount': 44,
				'name': 'bacon',
				'unit': 1
			},
			{
				'id': 75,
				'amount': 177.441,
				'name': 'beef broth',
				'unit': 5
			},
			{
				'id': 76,
				'amount': 680.389,
				'name': 'beef top sirloin steak',
				'unit': 1
			},
			{
				'id': 77,
				'amount': 425.243,
				'name': 'black beans',
				'unit': 1
			},
			{
				'id': 78,
				'amount': 0.5,
				'name': 'chili powder',
				'unit': 1
			},
			{
				'id': 79,
				'amount': 177.441,
				'name': 'chili sauce',
				'unit': 5
			},
			{
				'id': 80,
				'amount': 0,
				'name': 'chipotle chili in adobo sauce',
				'unit': 1
			},
			{
				'id': 81,
				'amount': 5,
				'name': 'adobo sauce from chipotle chilies',
				'unit': 1
			},
			{
				'id': 82,
				'amount': 0.8,
				'name': 'cilantro leaves',
				'unit': 1
			},
			{
				'id': 83,
				'amount': 118.294,
				'name': 'bell pepper',
				'unit': 5
			},
			{
				'id': 84,
				'amount': 118.294,
				'name': 'onion',
				'unit': 5
			},
			{
				'id': 85,
				'amount': 340.194,
				'name': 'mafalda pasta',
				'unit': 1
			},
			{
				'id': 86,
				'amount': 1.5,
				'name': 'garlic pepper',
				'unit': 1
			},
			{
				'id': 27,
				'amount': 3,
				'name': 'salt',
				'unit': 1
			}
		]
	},
	status: APIStatus.IDLE,
	loading: false,
	error: undefined
};
export const receiptsSlice = createSlice({
	name: 'recipes',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(filterRecipesAction.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(filterRecipesAction.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				console.log(action.payload.data);
				if (action.payload) state.recipes = action.payload.data.recipes;
			})
			.addCase(filterRecipesAction.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
				//state.error = action.error || undefined;
			})
			.addCase(saveRecipeToStorage.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(saveRecipeToStorage.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				console.log(action.payload);
				if (action.payload) state.chosenRecipe = action.payload;
			})
			.addCase(saveRecipeToStorage.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
			})
			.addCase(cookRecipe.pending, (state) => {
				state.status = APIStatus.PENDING;
			})
			.addCase(cookRecipe.fulfilled, (state, action) => {
				state.status = APIStatus.FULFILLED;
				state.loading = false;
			})
			.addCase(cookRecipe.rejected, (state, action) => {
				state.status = APIStatus.REJECTED;
			});
	}
});

export default receiptsSlice.reducer;
