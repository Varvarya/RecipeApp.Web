import moment from 'moment';
import {IngredientType} from '../state/groceriesSlice/requestsModels';

const ChangeModel = (analyzeModel: IngredientType[]) => {
	const res = analyzeModel.map((e) => {
		return {
			amount: e.amount,
			expirationDate: moment.utc(moment().add('days', 5)),
			lastModifiedDate: moment.utc(),
			ingredientId: e.id
		};
	});
	return res;
};

const PutModel = (initialModel: IngredientType[]) => {
	const res = initialModel.map((e) => {
		return {
			amount: e.amount,
			expirationDate: e.expirationDate,
			id: e.id
		};
	});
	return {storedIngredients: res};
};

export default ChangeModel;
export {PutModel};
