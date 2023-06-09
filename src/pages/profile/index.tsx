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
import {
	addUserForbiddenIngredientsAction,
	addUserForbiddenNutrientAction,
	deleteUserForbiddenIngredientsAction,
	getNutrientsListAction,
	getUserForbiddenIngredientsAction,
	getUserForbiddenNutrientAction,
	updateUserForbiddenNutrientAction
} from '../../state/forbiddenSlice/actions';
import groceries from '../groceries';

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
    getUserForbiddenIngredients: any,
    forbiddenIngredients: IngredientType[],
    forbiddenNutrients: Nutrient[],

    updateForbiddenNutrients: any,
    addForbiddenNutrients: any,
    addForbiddenIngredients: any,
    deleteForbiddenIngredient: any,
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
	forbiddenIngredients,
	forbiddenNutrients,
	updateForbiddenNutrients,
	addForbiddenNutrients,
	addForbiddenIngredients,
	deleteForbiddenIngredient,
	getUserForbiddenIngredients,
}) => {
	const [modalState, setModalState] = useState({visibility: false, func: 'Add', values: {name: '', info: ''}, id: 0});
	const [forbiddenModalState, setForbiddenModalState] = useState({
		visibility: false,
		searchText: '',
		activeTab: 'Nutrients',
		groceries: possibleGroceries,
		forbiddenIngredients: forbiddenIngredients,
		nutrients: nutrients,
		forbiddenNutrients: forbiddenNutrients,
		activeNutrient: undefined,
		activeIngredient: groceries[0],
		percent: 0,
		userId: 0
	});

	useEffect(() => {
		getFamilies();
		getUserForbiddenIngredients(11);
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
		setForbiddenModalState({...forbiddenModalState, searchText: el.name, groceries: [], activeIngredient: el});
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
		getUserForbiddenIngredients(id);
		setForbiddenModalState({
			...forbiddenModalState,
			visibility: true,
			forbiddenNutrients: forbiddenNutrients || [],
			nutrients: nutrients,
			userId: id,
		});
	};

	const forbid = () => {

		console.log('State', forbiddenModalState);
		if (forbiddenModalState.activeTab === 'Ingredients') {
			forbiddenModalState.activeIngredient && forbidIngredient(forbiddenModalState.activeIngredient);
		} else {
			forbiddenModalState.activeNutrient && forbidNutrient(forbiddenModalState.activeNutrient);
		}
	};
	const forbidIngredient = (ing: IngredientType) => {
		if (forbiddenModalState.forbiddenNutrients.some((e) => e.id === ing.id)) {
			deleteForbiddenIngredient({ingredientId: ing.id});
		} else {
			addForbiddenIngredients({ingredientId: ing.id, externalUserId: forbiddenModalState.userId});
		}
		getUserForbiddenIngredients(forbiddenModalState.userId);
	};
	const forbidNutrient = (nutrient: Nutrient) => {
		if (forbiddenModalState.forbiddenNutrients.some((e) => e.nutrientId === nutrient.id)) {
			updateForbiddenNutrients({
				nutrientId: nutrient.id,
				externalUserId: 11, requiredPercentageOfDailyNeeds: forbiddenModalState.percent
			});
		} else {
			addForbiddenNutrients({
				nutrientId: nutrient.id,
				externalUserId: 11, requiredPercentageOfDailyNeeds: forbiddenModalState.percent
			});
		}

		getForbiddenNutrients(forbiddenModalState.userId);
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
							onSelect={onSelect}
							onClick={forbid}
						/> : undefined}
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
					<Button text={'Add'} onClick={() => setModalState({
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
	forbiddenIngredients: forbidden.forbiddenIngredients,
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
	getForbiddenNutrients: getUserForbiddenNutrientAction,
	updateForbiddenNutrients: updateUserForbiddenNutrientAction,
	addForbiddenNutrients: addUserForbiddenNutrientAction,
	getUserForbiddenIngredients: getUserForbiddenIngredientsAction,
	addForbiddenIngredients: addUserForbiddenIngredientsAction,
	deleteForbiddenIngredient: deleteUserForbiddenIngredientsAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
