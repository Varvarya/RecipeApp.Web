import {MealPlan, MealRecipe} from '../types/additional_types';

const mealPlanForDays = (mealPlan: MealPlan) => {
	const res: MealRecipe[][] = [];
	mealPlan.mealPlanDays.forEach((element) => {
		if (res[element.ingestion?.dayOfWeek - 1]) {
			res[element.ingestion?.dayOfWeek - 1].push(element);
		} else {
			res[element.ingestion?.dayOfWeek - 1] = [element];
		}
	});


	console.log(res);
	return res;
};


const parseInfoForGeneration = (id: number, values: any) => {
	const res = {
		externalUserId: id,
		MealPlanGenerationSecondsLimit: undefined,
		AcceptableMatchIngredientsPercentage: 0,
		Calories: undefined,
		Carbs: undefined,
		Fat: undefined,
		Protein: undefined,
		ConsiderIngredientsAmount: false
	};

	console.log(values);
	values.forEach((el: any) => res[el.name] = el.value);

	console.log(res);
	return res;
};

export default mealPlanForDays;
export {parseInfoForGeneration};
