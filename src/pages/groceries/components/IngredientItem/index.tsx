import React, {ChangeEvent} from 'react';
import './styles.scss';
import TrashIcon from '../../../../assets/Icons/TrashBin.png';
import PenIcon from '../../../../assets/Icons/Pen.png';
import AddUser from '../../../../assets/Icons/AddUser.png';
import {IngredientType} from '../../../../state/groceriesSlice/requestsModels';

type IngredientItemProps = {
    ingredient: IngredientType,
    onClickFunc: (arg: string) => void,
	changeAmount: (amount: number, index: number) => void,
	index: number
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient, onClickFunc, changeAmount, index}) => {
	const handleClick = (e: any) => {
		console.log(e.target.id);

		onClickFunc(e.target.id);
	};

	return (
		<div className='item-container'>
			<span>
				<h3>{ingredient.name}</h3>
				<input type="number" step="1" min="1" max="100" value={ingredient.amount} name={ingredient.name} key={index} onChange={(e) => changeAmount(parseInt(e.target.value), index)}/>
				<img className='small-icon' src={TrashIcon} id={'Delete'} onClick={handleClick}/>
			</span>
		</div>
	);
};

export default IngredientItem;
