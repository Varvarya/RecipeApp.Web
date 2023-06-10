import {FamilyModel} from '../../../state/familiesSlice/requestsModels';
import React from 'react';
import './styles.scss';
import TrashIcon from '../../../assets/Icons/TrashBin.png';
import PenIcon from '../../../assets/Icons/Pen.png';
import Stop from '../../../assets/Icons/stop.png';
import AddUser from '../../../assets/Icons/AddUser.png';
import {FamilyMember} from '../../../consts/emptyObj';

type FamilyItemProps = {
    family: FamilyModel,
    modalState: { visibility: boolean, func: string, values: any, id: number },
    setModalState: (state: { visibility: boolean, func: string, values: any, id: number }) => void,
    openForbiddenModal: (id: number) => void,
    onClickFunc: (arg: string) => void,
}

const FamilyItem: React.FC<FamilyItemProps> = ({
	family,
	modalState,
	setModalState,
	openForbiddenModal,
	onClickFunc
}) => {
	const handleModalOpenClick = (e: any, member?: any) => {
		if (e.target.id.includes('Edit')) {
			setModalState({
				...modalState,
				visibility: true,
				func: e.target.id,
				values: member || family
			});
		} else if (e.target.id.includes('Add')) {
			setModalState({
				...modalState,
				visibility: true,
				func: e.target.id,
				values: FamilyMember
			});
		}
	};

	const handleDelete = (e: any) => {
		setModalState({...modalState, visibility: false, func: e.target.id});
		onClickFunc('Delete ' + e.target.id);
	};

	return (
		<div className='item-container'>
			<div className='fam-top-bar'>
				<div className='family-row'>
					<h3>{family.name}</h3>
					<div className='buttons-block'>
						<img className='small-icon small-button' src={AddUser} id='Add member'
							onClick={handleModalOpenClick}/>
						<img className='small-icon small-button' src={PenIcon} id='Edit'
							onClick={handleModalOpenClick}/>
						<img className='small-icon small-button' src={TrashIcon} id={'Delete ' + family.id}
							onClick={handleDelete}/>
					</div>
				</div>
				<div className='additional-info'>
					<h4>{family.info}</h4>
				</div>
			</div>
			<div className='family-members'>
				{family.familyMembers.map((member, i) =>
					<div key={i} className='item-text'>
						<div className='column'>
							<h4>{i + 1 + '. ' + member.name}</h4>
							<h5>{member.info}</h5>
						</div>
						<div>
							<img className='small-icon' id='Forbidden' src={Stop}
								onClick={() => openForbiddenModal(member.externalUserId)}/>
							<img className='small-icon' id='Edit member' src={PenIcon}
								onClick={(event) => handleModalOpenClick(event, member)}/>
							<img className='small-icon' id={'Delete member ' + member.id} src={TrashIcon}
								onClick={handleDelete}/></div>
					</div>)}
			</div>
		</div>
	);
};

export default FamilyItem;
