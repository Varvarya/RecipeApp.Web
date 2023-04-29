import React, {ChangeEvent, useEffect, useState} from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import Window from '../../components/window';
import Button from '../../components/button';
import uploadFile from '../../utils/fileReader';
import {analyzePhotoAction, getIngredientsListAction} from '../../state/groceriesSlice/actions';
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
	possibleGroceries=[]}) => {
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
	}, [modalState.visible, groceries, possibleGroceries, recognized]);

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
			setGroceriesList(res.payload.ingredients);
		});
	};

	const search = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
		getIngredientsListAction(e.target.value);
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
									{recognized.map((e, index) => (<IngredientItem key={index} ingredient={e} onClickFunc={() => console.log('click')} />))}
								</ul>
							</div>
						</div>
						<Button onClick={analyzePhoto} text={'Upload'}/>
					</ModalWindow>}
					<div>
						<SearchField input={searchText} placeholder={'Search ingredient'} onChange={search} name={'Search'}  values={possibleGroceries.map((e) => e.name)}/>
						<ul>
							{groceries.map((e, index) => (<IngredientItem key={index} ingredient={e} onClickFunc={() => console.log('click')} />))}
						</ul>
					</div>
					<Button text={'Add photo'} onClick={() => setModalState({...modalState, visible: true})} />
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
};

export default connect(mapStateToProps,mapDispatchToProps)(GroceriesPage);
