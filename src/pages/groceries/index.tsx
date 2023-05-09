import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import Button from '../../components/button';
import uploadFile from '../../utils/fileReader';
import {
	analyzePhotoAction,
	getIngredientsListAction,
	getStoredIngredientsAction,
	postStoredIngredientsAction
} from '../../state/groceriesSlice/actions';
import IngredientItem from './components/IngredientItem';
import {IngredientType} from '../../state/groceriesSlice/requestsModels';
import ModalWindow from '../../components/modalWindow';
import InputField from '../../components/inputField';
import SearchField from '../../components/searchField';

type GroceriesPageProps ={
	sendPhoto: any,
	getIngredientsListAction: any,
	groceries: IngredientType [],
	recognized: IngredientType [],
	possibleGroceries: IngredientType [],
	getStoredIngredients: any,
	postStoredIngredients: any
}

type modalState = {
	selectedFile?: any,
	preview?: string,
	visible: boolean,
}

const GroceriesPage: React.FC<GroceriesPageProps> = ({
	sendPhoto,
	getIngredientsListAction,
	groceries=[{id: 1, name: 'Name', amount: 1, unit: 'unit'}],
	recognized=[],
	possibleGroceries=[],
														 postStoredIngredients}) => {
	const [modalState, setModalState] = useState<modalState>({
		preview: undefined,
		visible: false,
	});

	const [searchText, setSearchText] = useState('');

	const [groceriesList, setGroceriesList] = useState([{id: 1, name: 'Name', amount: 1, unit: 'unit'}]);

	useEffect(() => {
		if (!modalState.selectedFile) {
			setModalState({...modalState, preview: undefined});
			return;
		}

		const objectUrl = URL.createObjectURL(modalState.selectedFile);
		setModalState({...modalState, preview: objectUrl});

		return () => URL.revokeObjectURL(objectUrl);
	}, [modalState.visible, groceries, groceriesList, possibleGroceries, recognized]);

	const onSelectFile = (e: any) => {
		if (!e.target.files || e.target.files.length === 0) {
			setModalState({...modalState, selectedFile: undefined});
			return;
		}

		setModalState({...modalState, selectedFile: e.target.files[0]});
	};

	const analyzePhoto = () => {
		if (modalState.selectedFile) sendPhoto(modalState.selectedFile).then((res: any) => {
			console.log(res);
			setGroceriesList([...groceriesList, ...res.payload.ingredients]);
		});
	};

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		getIngredientsListAction(e.target.value);
	};

	const select = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setSearchText('');
		console.log((e.target as HTMLElement).innerText);
	};

	const changeAmount = (amount: number, index: number) => {
		const res = groceriesList;
		if (amount !== 0) {
			res[index].amount = amount;
		} else {
			res.splice(index, 1);
		}
		console.log(res);
		setGroceriesList(res);
	};

	return (
		<div className='background'>
			<NavBar />
			<Window title={'My ingredients'}>
				<div className='content'>
					{modalState.visible && <ModalWindow title={'Add ingredient'} close={() => setModalState({...modalState, visible: false})}>
						<div className='row'>
							<form onClick={onSelectFile} className='fileUploader' >
								<label htmlFor="img">Select image:</label>
								<input type="file" id="img" name="img" accept="image/*" />
								{modalState.selectedFile && <img className='preview' src={modalState.preview} />}
							</form>
							<div className='fileUploader'>
								<ul>
									{recognized.map((e, index) => (
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
						<Button onClick={analyzePhoto} text={'Upload'}/>
					</ModalWindow>}
					<div>
						<SearchField
							input={searchText}
							placeholder={'Search ingredient'}
							onChange={search}
							onSelect={select}
							name={'Search'}
							values={possibleGroceries.map((e) => e.name)}
						/>
						<ul>
							{groceriesList.map((e, index) => (
								<IngredientItem
									key={index}
									index={index}
									ingredient={e}
									onClickFunc={() => changeAmount(0, index)}
									changeAmount={changeAmount}
								/>))}
						</ul>
					</div>
					<div className='row'>
						<Button text={'Save'} onClick={() => postStoredIngredients(groceriesList)} />
						<Button text={'Add photo'} color='opposite' onClick={() => setModalState({...modalState, visible: true})} />
					</div>

				</div>
			</Window>
		</div>
	);
};

const mapStateToProps = ({groceries}:any) => ({
	groceries: groceries.groceries,
	possibleGroceries: groceries.searchRes,
	recognized: groceries.recognizedGroceries,
});
const mapDispatchToProps = {
	sendPhoto: analyzePhotoAction,
	getIngredientsListAction: getIngredientsListAction,
	getStoredIngredients: getStoredIngredientsAction,
	postStoredIngredients: postStoredIngredientsAction
};

export default connect(mapStateToProps,mapDispatchToProps)(GroceriesPage);
