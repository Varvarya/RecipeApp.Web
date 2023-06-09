import React from 'react';
import './styles.scss';
import Button from '../../../components/button';
import SearchField from '../../../components/searchField';
import {Nutrient} from '../../../state/forbiddenSlice/requestsModels';
import {IngredientType} from '../../../state/groceriesSlice/requestsModels';

type ModalProps = {
    title: string,
    modalState: any,
    setModalState: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSelect: (el: IngredientType) => void,
    onClick: () => void,
}

const EditPopUp: React.FC<ModalProps> = ({title, modalState, setModalState, onChange, onSelect, onClick}) => {
	return (
		<div className='pop-up-container' onClick={() => setModalState({...modalState, visibility: false})}>
			<div className='pop-up-content' onClick={e => e.stopPropagation()}>
				<div className='controls'/>
				<div className='content-container'>
					<div className='row'>
						<Button text={'ingredients'}
							onClick={() => setModalState({...modalState, activeTab: 'Ingredients'})}/>
						<Button text={'nutrients'}
							onClick={() => setModalState({...modalState, activeTab: 'Nutrients'})}/>
					</div>
					<div className='children-container'>
						{modalState.activeTab === 'Ingredients' ?
							<div className={'column'}>
								<SearchField input={modalState.searchText} values={modalState.groceries}
									placeholder={''}
									onChange={onChange}
									onSelect={onSelect}
									name={'Name'}/>
								<div className={'container-nutrients'}>
									{modalState.forbiddenIngredients && <div className='select red'>
										{modalState.forbiddenIngredients?.map((element: IngredientType) => <div
											key={element.id}
											className='select-item'
											onClick={() => setModalState({
												...modalState,
												activeIngredient: element
											})}>{element.name}</div>)}
									</div>}
								</div>
							</div>
							:
							<>
								<div className={'row'}>
									<h3>{modalState.activeNutrient?.name}</h3>
									<input
										type="number"
										className='small-input'
										defaultValue={20}
										onChange={e => {
											setModalState({
												...modalState,
												percent: e.target.value
											});
										}}
									/>
								</div>
								<div className={'row'}>
									<div className={'container-nutrients'}>
										<div className='select red'>
											{modalState.forbiddenNutrients.map((element: Nutrient) => <div
												key={element.id}
												className='select-item'
												onClick={() => setModalState({
													...modalState,
													activeNutrient: element
												})}>{element.name}</div>)}
										</div>
									</div>
									<div className={'container-nutrients'}>
										<div className='select'>
											{modalState.nutrients.map((element: Nutrient) => <div key={element.id}
												className='select-item'
												onClick={() => setModalState({
													...modalState,
													activeNutrient: element
												})}>{element.name}</div>)}
										</div>
									</div>
								</div>
							</>
						}
					</div>

					<Button text={'Forbid'} color={'red'} onClick={onClick}/>
				</div>
			</div>
		</div>
	);
};

export default EditPopUp;
