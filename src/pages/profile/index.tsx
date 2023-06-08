import React, {ChangeEvent, useEffect, useState} from 'react';
import './styles.scss';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import {
	addFamily,
	addFamilyMember,
	deleteFamily,
	deleteFamilyMember,
	editFamily,
	editFamilyMember,
	getUserFamilies
} from '../../state/familiesSlice/actions';
import FamilyItem from './familyItem';
import EditPopUp from '../../components/editPopUp';
import {addFamiliesModel, FamilyModel} from '../../state/familiesSlice/requestsModels';
import Button from '../../components/button';
import ForbiddenModal from './forbiddenModal';
import {getIngredientsListAction} from '../../state/groceriesSlice/actions';
import {IngredientType} from '../../state/groceriesSlice/requestsModels';
import {Nutrient} from '../../state/forbiddenSlice/requestsModels';
import {getNutrientsListAction, getUserForbiddenIngredientsAction} from '../../state/forbiddenSlice/actions';

type ProfilePageProps = {
    user: any,
    families: FamilyModel[],
    possibleGroceries: IngredientType[],
    nutrients: Nutrient[],
    getFamilies: () => void,
    getNutrients: () => void,
    addFamily: (data: addFamiliesModel) => void,
    deleteFamily: (id: number) => void,
    addFamilyMember: (data: addFamiliesModel) => void,
    deleteFamilyMember: (id: number) => void,
    editFamilyMember: (data: addFamiliesModel) => void,
    editFamily: (data: addFamiliesModel) => void,
    getIngredientsList: any,
    getForbiddenNutrients: any,
    forbiddenGroceries: IngredientType[],
    forbiddenNutrients: Nutrient[]
}

const UserProfilePage: React.FC<ProfilePageProps> = ({
	user,
	families,
	possibleGroceries,
	nutrients,
	getFamilies,
	getNutrients,
	addFamily,
	deleteFamily,
	addFamilyMember,
	editFamilyMember,
	deleteFamilyMember,
	editFamily,
	getIngredientsList,
	getForbiddenNutrients,
	forbiddenGroceries,
	forbiddenNutrients
}) => {
	const [modalState, setModalState] = useState({visibility: false, func: 'Add', values: {name: '', info: ''}, id: 0});
	const [forbiddenModalState, setForbiddenModalState] = useState({
		visibility: false,
		searchText: '',
		activeTab: 'Nutrients',
		groceries: possibleGroceries,
		forbiddenGroceries: forbiddenGroceries,
		nutrients: nutrients,
		forbiddenNutrients: forbiddenNutrients
	});

	useEffect(() => {
		getFamilies();
		getNutrients();
	}, []);

	const editField = (a: any) => {
		setModalState({...modalState, values: {...modalState.values, [a.name]: a.value}});
	};

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		getIngredientsList(e.target.value);
		setForbiddenModalState({...forbiddenModalState, searchText: e.target.value, groceries: possibleGroceries});
	};

	const onSelect = (el: IngredientType) => {
		getIngredientsList(el.name);
		setForbiddenModalState({...forbiddenModalState, searchText: el.name, groceries: []});
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
		} else if (func.includes('Edit')) {
			editFamilyMember(modalState.values);
		}

		setModalState({...modalState, visibility: false});
		getFamilies();
	};

	const openForbiddenModal = (id: number) => {
		getForbiddenNutrients(id);
		setForbiddenModalState({
			...forbiddenModalState,
			visibility: true,
			forbiddenNutrients: forbiddenNutrients || []
		});
	};

	return (
		<div className='background'>
			<NavBar/>
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
					{forbiddenModalState.visibility ?
						<ForbiddenModal title={'Forbidden ingredients'}
							modalState={forbiddenModalState}
							setModalState={setForbiddenModalState}
							onChange={search}
							onSelect={onSelect}/> : undefined}
					<label>My families</label>
					<div className='list'>
						{families.map((e: any, index: number) => (
							<FamilyItem
								key={index}
								family={e}
								modalState={modalState}
								setModalState={setModalState.bind(this)}
								openForbiddenModal={openForbiddenModal}
								onClickFunc={handleClick}
							/>))}
					</div>
					<Button text={'Add family'} onClick={() => setModalState({
						visibility: true,
						func: 'Add',
						values: {name: '', info: ''},
						id: 0
					})} color='opposite'/>
				</div>
			</Window>
		</div>
	);
};

const mapStateToProps = ({families, groceries, forbidden}: any) => ({
	user: families.user,
	families: families.families,
	possibleGroceries: groceries.searchRes,
	nutrients: forbidden.nutrients,
	forbiddenGroceries: forbidden.forbiddenGroceries,
	forbiddenNutrients: forbidden.forbiddenNutrients
});
const mapDispatchToProps = {
	getFamilies: getUserFamilies,
	getNutrients: getNutrientsListAction,
	addFamily: addFamily,
	deleteFamily: deleteFamily,
	addFamilyMember: addFamilyMember,
	editFamily: editFamily,
	editFamilyMember: editFamilyMember,
	deleteFamilyMember: deleteFamilyMember,
	getIngredientsList: getIngredientsListAction,
	getForbiddenNutrients: getUserForbiddenIngredientsAction
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
