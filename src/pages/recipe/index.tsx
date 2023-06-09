import React, {useState} from 'react';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {filterRecipesAction} from '../../state/recipes/actions';
import {Recipe} from '../../state/recipes/requestsModels';

type RecipesProps = {
    recipes?: Recipe[],
    getFilteredRecipes: any,
}

const Recipes: React.FC<RecipesProps> = ({recipes, getFilteredRecipes}) => {
	const [params, setParams] = useState({
		Title: '',
		FromCalories: 0,
		ToCalories: 1000,
		FromCarbs: 0,
		ToCarbs: 100,
		FromFat: 0,
		ToFat: 100,
		FromProtein: 0,
		ToProtein: 100,
		FromReadyInMinutes: 0,
		ToReadyInMinutes: 300,
		IsVegan: false,
		IsHealthy: false,
		UseCurrentlyStoredIngredients: false,
		ExcludeForbiddenIngredients: true,
		ConsiderIngredientsAmount: true,
		acceptableMatchIngredientsPercentage: 10,
	});

	const changeParam = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParams({...params, [e.target.name]: e.target.value});
	};

	return (
		<div className='background'>
			<NavBar/>
			<Window title={'Recipes'}>

			</Window>
		</div>
	);
};

const mapStateToProps = ({recipes}: RootState) => ({
	recipes: recipes.recipes
});
const mapDispatchToProps = {
	getFilteredRecipes: filterRecipesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
