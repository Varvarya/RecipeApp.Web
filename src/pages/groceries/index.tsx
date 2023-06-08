import React, {ChangeEvent, useEffect, useState} from 'react';
import './styles.scss';
import {connect} from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import Button from '../../components/button';
import {
	analyzePhotoAction,
	getIngredientsListAction,
	getStoredIngredientsAction,
	postStoredIngredientsAction,
	putStoredIngredientsAction
} from '../../state/groceriesSlice/actions';
import IngredientItem from './components/IngredientItem';
import {IngredientType} from '../../state/groceriesSlice/requestsModels';
import ModalWindow from '../../components/modalWindow';
import SearchField from '../../components/searchField';
import {RootState} from '../../state/store';
import Table from '../../components/table';
import moment from 'moment';
import ChangeModel from '../../utils/ingredientModelRewriter';

type GroceriesPageProps = {
    sendPhoto: any,
    getIngredientsList: any,
    stored: IngredientType [],
    recognized: IngredientType [],
    possibleGroceries: IngredientType [],
    getStoredIngredients: any,
    putStoredIngredients: any,
    postStoredIngredients: any,
    loading: boolean
}

type modalState = {
    selectedFile?: any,
    preview?: string,
    visible: boolean,
}

const GroceriesPage: React.FC<GroceriesPageProps> = ({
	loading,
	sendPhoto,
	getIngredientsList,
	getStoredIngredients,
	putStoredIngredients,
	stored = [],
	recognized = [],
	possibleGroceries = [],
	postStoredIngredients
}) => {
	const [modalState, setModalState] = useState<modalState>({
		preview: undefined,
		visible: false,
	});


	const [searchText, setSearchText] = useState('');

	const [groceriesList, setGroceriesList] = useState({
		searched: possibleGroceries,
		stored: stored,
		recognized: recognized
	});

	useEffect(() => {
		getStoredIngredients();

		if (!modalState.selectedFile) {
			setModalState({...modalState, preview: undefined});
			return;
		}

		const objectUrl = URL.createObjectURL(modalState.selectedFile);
		setModalState({...modalState, preview: objectUrl});

		return () => URL.revokeObjectURL(objectUrl);
	}, []);

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setModalState({...modalState, selectedFile: undefined});
			return;
		}

		setModalState({...modalState, selectedFile: e.target.files[0]});
	};

	const analyzePhoto = () => {
		if (modalState.selectedFile) sendPhoto(modalState.selectedFile).then((res: any) => {
			setGroceriesList({...groceriesList, recognized: [...res.payload.ingredients]});
		});
	};

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		getIngredientsList(e.target.value);
		setGroceriesList({...groceriesList, searched: possibleGroceries});
	};

	const select = (ingredient: IngredientType) => {
		setSearchText('');
		postStoredIngredients([{
			ingredientId: ingredient.id,
			amount: 1,
			expirationDate: moment.utc(),
			lastModifiedDate: moment.utc()
		}]);
		getStoredIngredients();
	};

	const changeAmount = (amount: number, index: number) => {
		console.log(amount, index);
		const res = [...groceriesList.recognized.slice(0, index), {
			...groceriesList.recognized[index],
			amount: amount
		}, ...groceriesList.recognized.slice(index + 1, groceriesList.recognized.length)];

		console.log('Res', res);
		setGroceriesList({...groceriesList, recognized: res});
	};

	return (
		<div className='background'>
			<NavBar/>
			<Window title={'My ingredients'}>
				<div className='content'>
					{modalState.visible && <ModalWindow title={'Add ingredient'}
						close={() => setModalState({...modalState, visible: false})}>
						<div className='row'>
							<form onClick={onSelectFile} className='fileUploader'>
								<label htmlFor="img">Select image:</label>
								<input type="file" id="img" name="img" accept="image/*"/>
								{modalState.selectedFile && <img className='preview' src={modalState.preview}/>}
							</form>
							<div className='fileUploader'>
								<ul>
									{groceriesList.recognized.map((e, index) => (
										<IngredientItem
											key={index}
											index={index}
											ingredient={e}
											onClickFunc={() => changeAmount(0, index)}
											changeAmount={changeAmount}
										/>))}
								</ul>
							</div>
						</div>
						<span>
							<Button color='opposite' onClick={analyzePhoto} text={'Upload'} loading={loading}/>
							{!!groceriesList.recognized &&
                                <Button text={'Save'}
                                	onClick={() => postStoredIngredients(ChangeModel(groceriesList.recognized))}/>}
						</span>
					</ModalWindow>}
					<div>
						<SearchField
							input={searchText}
							placeholder={'Search ingredient'}
							onChange={search}
							onSelect={select}
							name={'Search'}
							values={groceriesList.searched}
						/>
						<Table data={groceriesList.stored}/>
					</div>
					<div className='row'>
						<Button text={'Save'} onClick={() => putStoredIngredients(groceriesList)}/>
						<Button text={'Add photo'} color='opposite'
							onClick={() => setModalState({...modalState, visible: true})}/>
					</div>
				</div>
			</Window>
		</div>
	);
};

const mapStateToProps = ({groceries}: RootState) => ({
	stored: groceries.storedGroceries,
	possibleGroceries: groceries.searchRes,
	recognized: groceries.recognizedGroceries,
	loading: groceries.loading,
});
const mapDispatchToProps = {
	sendPhoto: analyzePhotoAction,
	getIngredientsList: getIngredientsListAction,
	getStoredIngredients: getStoredIngredientsAction,
	putStoredIngredients: putStoredIngredientsAction,
	postStoredIngredients: postStoredIngredientsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(GroceriesPage);
















