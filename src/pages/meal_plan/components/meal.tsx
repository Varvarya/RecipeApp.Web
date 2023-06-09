import React from 'react';
import {Recipe} from '../../../state/recipes/requestsModels';

type MealRowProps = {
    el: Recipe,
    i: number,
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,

    isActive: boolean
}


const meals = [
	{
		dishType: 'Breakfast',
		color: 'accent'
	},
	{
		dishType: 'Lunch',
		color: 'primary'
	},
	{
		dishType: 'Dinner',
		color: 'secondary'
	},
	{
		dishType: 'Перекус',
		color: 'opposite'
	},
	{
		dishType: '',
		color: 'opposite'
	}
];
const MealRow: React.FC<MealRowProps> = ({el, i = 4, onClick, isActive}) => {
	return (
		<div id={el.title} key={i} className={'meal ' + meals[i].color}
			onClick={onClick ? onClick.bind(this) : () => {
				console.log('click');
			}}>
			<div
				className={'mealBar ' + meals[i].color + ' ' + (isActive ? 'active' : 'closed')}>
				<h3 className={'mealTitle'}>{meals[i].dishType}</h3>
				<h3 className={'meal-title'}>{el.title}</h3>
			</div>
			{isActive &&
                <div className='meal-content'>
                	<div className='ingredients'>
                		<h4>Ingredient</h4>
                		{el.ingredients.map((ing, i) =>
                			<h5 key={i}>{ing.amount} {ing.name} </h5>)}

                		<h4>Calories {el.calories}k</h4>
                		<div className='row'>
                			<h5>Protein {el.protein}g | </h5>
                			<h5>Total fat {el.fat}g | </h5>
                			<h5>Carbs {el.carbs}g</h5>
                		</div>
                	</div>
                	<img className={'meal-image ' + meals[i].color} src={el.image}/>
                </div>
			}
		</div>);
};

export default MealRow;
