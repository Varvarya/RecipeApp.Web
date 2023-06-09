import React, {useState} from 'react';
import {MealRecipe} from '../../../types/additional_types';
import MealRow from './meal';
import './styles.scss';

type MealsListProps = {
    plan: MealRecipe[],
}


const MealsList: React.FC<MealsListProps> = ({plan}) => {
	const [activeMeal, setActiveMeal] = useState('');

	const toggleActiveMeal = (event: React.MouseEvent<HTMLDivElement>) => {
		const id = (event.currentTarget as Element).id;
		if (activeMeal !== id) setActiveMeal(id);
		else setActiveMeal('');
	};

	return (
		<div className='column'>
			{plan.map((el, i) =>
				<MealRow key={i} el={el.recipe} i={i} isActive={activeMeal === el.recipe.title}
					onClick={toggleActiveMeal}/>)}
		</div>);
};


export default MealsList;
