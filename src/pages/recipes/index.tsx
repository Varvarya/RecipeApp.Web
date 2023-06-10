import React, {useState} from 'react';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import Balancer from '../../components/balancer';
import Button from '../../components/button';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {filterRecipesAction, saveRecipeToStorage} from '../../state/recipes/actions';
import {Recipe} from '../../state/recipes/requestsModels';
import MealRow from '../meal_plan/components/meal';
import {useHistory} from 'react-router-dom';

type RecipesProps = {
    recipes?: Recipe[],
    getFilteredRecipes: any,
    saveRecipeToStorage: any,
}

const Recipes: React.FC<RecipesProps> = ({recipes, getFilteredRecipes, saveRecipeToStorage}) => {
	const history = useHistory();

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

	const chooseRecipe = (recipe: Recipe) => {
		saveRecipeToStorage(recipe);
		history.push('/recipe/' + recipe.id);
	};

	return (
		<div className='background'>
			<NavBar/>
			<Window title={'Recipes'}>
				<div>
					<InputField placeholder={'title'} onChange={changeParam} name={'Title'} value={params.Title}/>
					<Balancer minValName={'FromCalories'} maxValName={'ToCalories'} minVal={params.FromCalories}
						maxVal={params.ToCalories}
						onChange={changeParam}/>
					<Balancer minValName={'FromCarbs'} maxValName={'ToCarbs'} minVal={params.FromCarbs}
						maxVal={params.ToCarbs}
						onChange={changeParam}/>
					<Balancer minValName={'FromFat'} maxValName={'ToFat'} minVal={params.FromFat} maxVal={params.ToFat}
						onChange={changeParam}/>
					<Balancer minValName={'FromProtein'} maxValName={'ToProtein'} minVal={params.FromProtein}
						maxVal={params.ToProtein}
						onChange={changeParam}/>
					<Balancer minValName={'FromReadyInMinutes'} maxValName={'ToReadyInMinutes'}
						minVal={params.FromReadyInMinutes} maxVal={params.ToReadyInMinutes}
						onChange={changeParam}/>
					<h5>IsVegan</h5>
					<input type='checkbox' checked={params.IsVegan} name={'IsVegan'} onChange={changeParam}/>
					<h5>IsHealthy</h5>
					<input type='checkbox' checked={params.IsHealthy} name={'IsHealthy'} onChange={changeParam}/>
					<h5>UseCurrentlyStoredIngredients</h5>
					<input type='checkbox' checked={params.UseCurrentlyStoredIngredients}
						name={'UseCurrentlyStoredIngredients'} onChange={changeParam}/>
					<h5>ExcludeForbiddenIngredients</h5>
					<input type='checkbox' checked={params.ExcludeForbiddenIngredients}
						name={'ExcludeForbiddenIngredients'} onChange={changeParam}/>
					<h5>ConsiderIngredientsAmount</h5>
					<input type='checkbox' checked={params.ConsiderIngredientsAmount} name={'ConsiderIngredientsAmount'}
						onChange={changeParam}/>
					<div className='row'>
						<h5>acceptableMatchIngredientsPercentage</h5>
						<input type='number' value={params.acceptableMatchIngredientsPercentage}
							name={'acceptableMatchIngredientsPercentage'} onChange={changeParam}/>
					</div>
				</div>

				<Button text={'Find'} onClick={() => getFilteredRecipes(params)}/>
				<div className='column'>
					{recipes?.map((el, i) =>
						<MealRow key={i} el={el} i={4} isActive={false} onClick={() => chooseRecipe(el)}
							saveRecipeToStorage={saveRecipeToStorage}/>)}
				</div>
			</Window>
		</div>
	);
};

const mapStateToProps = ({recipes}: RootState) => ({
	recipes: recipes.recipes
});
const mapDispatchToProps = {
	getFilteredRecipes: filterRecipesAction,
	saveRecipeToStorage: saveRecipeToStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
