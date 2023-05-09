
import React, {useEffect, useState} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import {addFamily, addFamilyMember, deleteFamily, deleteFamilyMember, editFamily, getUserFamilies} from '../../state/familiesSlice/actions';
import FamilyItem from './familyItem';
import EditPopUp from '../../components/editPopUp';
import {addFamiliesModel} from '../../state/familiesSlice/requestsModels';

type ProfilePageProps ={
	user: any,
	families: any,
	getFamilies: () => void,
	addFamily: (data: addFamiliesModel) => void,
	deleteFamily: (id: number) => void,
	addFamilyMember: (data: addFamiliesModel) => void,
	deleteFamilyMember: (id: number) => void,
	editFamily: (data: addFamiliesModel) => void
}

const UserProfilePage: React.FC<ProfilePageProps> = ({user, families = [{'id': 0,
	'name': 'string',
	'info': 'string',
	'familyMembers': [
		{
			'id': 0,
			'externalUserId': 0,
			'name': 'string',
			'userName': 'string',
			'dob': '2023-04-20T10:18:08.208Z',
			'info': 'string'
		}
	]
}], getFamilies, addFamily, deleteFamily, addFamilyMember, deleteFamilyMember, editFamily}) => {
	const [modalState, setModalState] = useState({visibility: false, func: 'Add', values: {name: '', info: ''}, id: 0});

	useEffect(() => {
		getFamilies();
		console.log(modalState);
	}, [modalState]);

	const editField = (a: any) => {
		const initValues = modalState.values;
		console.log(initValues);

		initValues[a.name] = a.value;

		console.log(initValues);
		setModalState({...modalState, values: initValues});
	};

	const handleClick = (arg?: string) => {
		const func = arg || modalState.func;

		if (func.includes('member')) {
			handleClickMember(func || modalState.func);
		} else {
			handleClickFamily(func || modalState.func);
		}
	};

	const handleClickFamily = (func: string) => {
		console.log(func);
		if (func.includes('Add')) {
			addFamily(modalState.values);
		} else if (func.includes('Delete')) {
			deleteFamily(Number(func.split(' ').pop()) || 0);
		} else if (func.includes('Edit')) {
			editFamily(modalState.values);
		}

		setModalState({...modalState, visibility: false});
		getFamilies();
	};

	const handleClickMember = (func: string) => {
		if (func.includes('Add')) {
			addFamilyMember(modalState.values);
		} else if (func.includes('Delete')) {
			deleteFamilyMember(Number(func.split(' ').pop()) || 0);
		}

		setModalState({...modalState, visibility: false});
		getFamilies();
	};

	return (
		<div className='background'>
			<NavBar />
			<Window title={'User profile'}>
				<div className='list-container'>
					{modalState.visibility ?
						(<EditPopUp
							title={modalState.func}
							fields={modalState.values}
							editFields={editField.bind(this)}
							onClick={() => handleClick()}
							close={() =>
								setModalState({...modalState, visibility: false})}
						/>) : undefined
					}
					<label>My families</label>
					<div className='list'>
						{families.map((e: any, index: number) => (
							<FamilyItem
								key={index}
								family={e}
								modalState={modalState}
								setModalState={setModalState.bind(this)}
								onClickFunc={handleClick}
							/>))}
					</div>
				</div>
			</Window>
		</div>
	);
};

const mapStateToProps = ({families}:any) => ({
	user: families.user,
	families: families.families
});
const mapDispatchToProps = {
	getFamilies: getUserFamilies,
	addFamily: addFamily,
	deleteFamily: deleteFamily,
	addFamilyMember: addFamilyMember,
	editFamily: editFamily,
	deleteFamilyMember: deleteFamilyMember,
};
export default connect(mapStateToProps,mapDispatchToProps)(UserProfilePage);
