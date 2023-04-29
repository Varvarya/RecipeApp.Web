import {familyModel} from '../../../state/familiesSlice/requestsModels';
import React from 'react';
import './styles.scss';
import TrashIcon from '../../../assets/Icons/TrashBin.png';
import PenIcon from '../../../assets/Icons/Pen.png';
import AddUser from '../../../assets/Icons/AddUser.png';

type FamilyItemProps = {
    family: familyModel,
	modalState: {visibility: boolean, func: string, values: any, id: number},
	setModalState: (state :  {visibility: boolean, func: string, values: any, id: number}) => void,
	onClickFunc: (arg: string) => void,
}

const FamilyItem: React.FC<FamilyItemProps> = ({family, modalState, setModalState, onClickFunc}) => {
	const handleClick = (e: any) => {
		console.log(e.target.id);
		setModalState({...modalState, visibility: true, func: e.target.id});

		onClickFunc(e.target.id);
	};

	return (
		<div className='item-container'>
			<span>
				<h3>{family.name}</h3>
				<img className='small-icon' src={AddUser} id='Add' onClick={handleClick}/>
				<img className='small-icon' src={PenIcon} id='Edit' onClick={handleClick}/>
				<img className='small-icon' src={TrashIcon} id={'Delete '+family.id} onClick={handleClick}/>
			</span>
			<h4>{family.info}</h4>
			<div className='family-members-list'>
				{family.familyMembers.map((e, i) =>
					<div key={i} className='item-text'>
						<h4>{i+1 +'. '+ e.name}</h4>
						<img className='small-icon' id='Edit member' src={PenIcon} onClick={handleClick}/>
						<img className='small-icon' id={'Delete member ' + e.id} src={TrashIcon} onClick={handleClick}/>
					</div>)}
			</div>
		</div>
	);
};

export default FamilyItem;
