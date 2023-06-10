import React from 'react';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {cookRecipe, filterRecipesAction} from '../../state/recipes/actions';
import {Recipe} from '../../state/recipes/requestsModels';
import CaloriesBlock from './components/caloriesBlock';
import Units from '../../consts/units';
import './styles.scss';
import Button from '../../components/button';

type RecipeProps = {
    recipe?: Recipe,
    cookRecipe: any,
}

const RecipePage: React.FC<RecipeProps> = ({recipe, cookRecipe}) => {
	console.log(recipe);
	return (
		<div className='background'>
			<NavBar/>
			{recipe &&
                <Window title={recipe?.title || ''}>
                	<div className={'div-text'} dangerouslySetInnerHTML={{__html: recipe?.summary || ''}}/>
                	<CaloriesBlock recipe={recipe}/>

                	<div className='row'>
                		<div className='ingredients'>
                			<h4>Ingredient</h4>
                			{recipe.ingredients.map((ing, i) =>
                				<h5 key={i}>{ing.amount} {Units[ing.unit]} {ing.name} </h5>)}
                		</div>
                		<img className={'meal-image ' + 'primary'} src={recipe.image}/>
                	</div>
                	<Button text={'Cook'} onClick={() => cookRecipe(recipe?.id)} size='small'/>
                	<div className='steps'>
                		{recipe.recipeSteps.map((step, i) =>
                			<h5 className='left' key={step.id}><b>{i + 1}.</b> {step.description}</h5>)}
                	</div>
                </Window>
			}
		</div>
	);
};

const mapStateToProps = ({recipes}: RootState) => ({
	recipe: recipes.chosenRecipe,
});
const mapDispatchToProps = {
	getFilteredRecipes: filterRecipesAction,
	cookRecipe: cookRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
