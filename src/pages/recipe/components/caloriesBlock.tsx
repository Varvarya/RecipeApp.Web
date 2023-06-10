import {Recipe} from '../../../state/recipes/requestsModels';
import React from 'react';
import './styles.scss';

type CaloriesBlock = {
    recipe: Recipe
}

const CaloriesBlock: React.FC<CaloriesBlock> = ({recipe}) => {
	return (
		<div className={'calories-container'}>
			<h3 className={'thin'}>Calories <b>{recipe.calories}</b></h3>
			<h4>Protein {recipe.protein} | Fat {recipe.fat} | Carbs {recipe.carbs}</h4>
		</div>
	);
};

export default CaloriesBlock;
