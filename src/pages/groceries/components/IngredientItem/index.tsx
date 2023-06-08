import React from 'react';
import './styles.scss';
import TrashIcon from '../../../../assets/Icons/TrashBin.png';
import {IngredientType} from '../../../../state/groceriesSlice/requestsModels';

type IngredientItemProps = {
	ingredient: IngredientType,
	onClickFunc: (arg: string) => void,
	changeAmount: (amount: number, index: number) => void,
	index: number
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient, onClickFunc, changeAmount, index}) => {
	const handleClick = (e: any) => {
		onClickFunc(e.target.id);
	};

	return (<div className='ingredient-container'>
		<h4>{ingredient.name}</h4>
		<input className='num-input' type="number" step="1" min="1" max="50" value={ingredient.amount || 1}
			   name={ingredient.name} key={index} onChange={(e) => changeAmount(parseInt(e.target.value), index)}/>
		<img className='small-icon' src={TrashIcon} id={'Delete'} onClick={handleClick}/>
	</div>);
};

export default IngredientItem;
