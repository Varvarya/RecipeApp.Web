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
}

const EditPopUp: React.FC<ModalProps> = ({title, modalState, setModalState, onChange, onSelect}) => {
	return (
		<div className='pop-up-container' onClick={undefined}>
			<div className='pop-up-content' onClick={undefined}>
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
							<SearchField input={modalState.searchText} values={modalState.groceries} placeholder={''}
								onChange={onChange}
								onSelect={onSelect}
								name={'Name'}/>
							:
							<div className={'row'}>
								<div className={'container-nutrients'}>
									<div className='select'>
										{modalState.forbiddenNutrients.map((element: Nutrient) => <div key={element.id}
											className='select-item'
											onClick={() => console.log(element)}>{element.name}</div>)}
									</div>
								</div>
								<div className={'container-nutrients'}>
									<div className='select'>
										{modalState.nutrients.map((element: Nutrient) => <div key={element.id}
											className='select-item'
											onClick={() => console.log(element)}>{element.name}</div>)}
									</div>
								</div>
							</div>
						}
					</div>
					<Button text={'Forbid'} color={'red'} onClick={() => console.log(modalState.searchText)}/>
				</div>
			</div>
		</div>
	);
};

export default EditPopUp;
