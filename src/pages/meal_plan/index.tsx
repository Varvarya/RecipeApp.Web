import React, {useEffect, useState} from 'react';
import NavBar from '../../components/navBar';
import Button from '../../components/button';
import Window from '../../components/window';
import MealsList from './components/mealsList';
import mealPlanForDays, {parseInfoForGeneration} from '../../utils/parseMealPlan';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {generateMealPlan, getUserMealPlans} from '../../state/meal_plan/actions';
import {MealPlan} from '../../types/additional_types';
import Loader from '../../components/loader';
import RoundButton from '../../components/roundButton';
import './styles.scss';
import GenerateInfo from './components/fieldsForGenerate';
import {UserType} from '../../state/loginSlice/requestsModels';
import {saveRecipeToStorage} from '../../state/recipes/actions';

type MealPlansProps = {
    loading: boolean,
    mealPlans?: MealPlan[],
    generated?: MealPlan,
    getUserMealPlans: any,
    generateMealPlan: any,
    userInfo?: UserType,

    saveRecipeToStorage: any,
}

const MealPlans: React.FC<MealPlansProps> = ({
	loading,
	mealPlans,
	getUserMealPlans,
	generateMealPlan,
	userInfo,
	generated,
	saveRecipeToStorage
}) => {
	const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
	const [activeState, setActiveState] = useState({day: 0, plan: 0});

	useEffect(() => {
		getUserMealPlans();
	}, []);

	const [modalState, setModalState] = useState<{
        visibility: boolean, values: {
            name: string,
            value: undefined | number | boolean,
            step: number,
            type: string
        }[]
    }>({
    	visibility: false, values: [
    		{
    			name: 'MealPlanGenerationSecondsLimit',
    			value: undefined,
    			step: 5,
    			type: 'number'
    		},
    		{
    			name: 'AcceptableMatchIngredientsPercentage',
    			value: undefined,
    			step: 1,
    			type: 'number'
    		},
    		{
    			name: 'Calories',
    			value: undefined,
    			step: 50,
    			type: 'number'
    		},
    		{
    			name: 'Carbs',
    			value: undefined,
    			step: 1,
    			type: 'number'
    		},
    		{
    			name: 'Fat',
    			value: undefined,
    			step: 1,
    			type: 'number'
    		},
    		{
    			name: 'Protein',
    			value: undefined,
    			step: 1,
    			type: 'number'
    		},
    		{
    			name: 'ConsiderIngredientsAmount',
    			value: undefined,
    			step: 1,
    			type: 'checkbox'
    		}
    	]
    });

	const changeValue = (name: string, value: number | boolean | undefined) => {
		console.log('name ', name, 'value ', value);
		const res = modalState.values;
		res.map((el) => el.value = (el.name === name) ? value : el.value);
		setModalState({...modalState, values: res});
	};


	return (
		<div className='background'>
			<NavBar/>
			<Window title={'Meal Plans'}>
				<div className='row controllers'>
					{modalState.visibility &&
                        <GenerateInfo close={() => setModalState({...modalState, visibility: false})}
                        	values={modalState.values} changeValue={changeValue}
                        	onClick={() => generateMealPlan(parseInfoForGeneration(userInfo?.externalUserId || 11, modalState.values))}
                        	loading={loading}/>}
					<select>
						{mealPlans?.map((el, i) =>
							<option key={i} selected={i === activeState.plan}>{el.mealPlanDate}</option>)}
					</select>
					<Button text={'Generate'} onClick={() => setModalState({...modalState, visibility: true})}
						size={'small'}/>
				</div>
				<div className='row'>
					{days.map((day, i) => <RoundButton key={i} text={day}
						onClick={() => setActiveState({...activeState, day: i})}
						color={(i === activeState.day) ? 'accent' : 'base'}/>)}
				</div>
				{(mealPlans && mealPlans[activeState.plan]) ? <div className='column'>
					<MealsList plan={mealPlanForDays(mealPlans[activeState.plan])[activeState.day]}
						saveRecipeToStorage={saveRecipeToStorage}/>
				</div> : <Loader/>}
			</Window>
		</div>
	);
};
const mapStateToProps = ({mealPlan, login}: RootState) => ({
	error: mealPlan.error,
	loading: mealPlan.loading,
	mealPlans: mealPlan.mealPlans,
	generated: mealPlan.generated,
	userInfo: login.user
});
const mapDispatchToProps = {
	getUserMealPlans: getUserMealPlans,
	generateMealPlan: generateMealPlan,
	saveRecipeToStorage: saveRecipeToStorage
};

export default connect(mapStateToProps, mapDispatchToProps)(MealPlans);
