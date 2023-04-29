import React from 'react';
import './styles.scss';
import TrashIcon from '../../../../assets/Icons/TrashBin.png';
import PenIcon from '../../../../assets/Icons/Pen.png';
import AddUser from '../../../../assets/Icons/AddUser.png';
import {IngredientType} from '../../../../state/groceriesSlice/requestsModels';

type IngredientItemProps = {
    ingredient: IngredientType,
    onClickFunc: (arg: string) => void,
}

const IngredientItem: React.FC<IngredientItemProps> = ({ingredient, onClickFunc}) => {
	const handleClick = (e: any) => {
		console.log(e.target.id);

		onClickFunc(e.target.id);
	};

	return (
		<div className='item-container'>
			<span>
				<h3>{ingredient.name}</h3>
				<img className='small-icon' src={AddUser} id='Add' onClick={handleClick}/>
				<img className='small-icon' src={PenIcon} id='Edit' onClick={handleClick}/>
				<img className='small-icon' src={TrashIcon} id={'Delete'} onClick={handleClick}/>
			</span>
		</div>
	);
};

export default IngredientItem;
