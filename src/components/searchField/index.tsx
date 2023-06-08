import React, {ChangeEvent} from 'react';
import './styles.scss';
import InputField from '../inputField';
import {IngredientType} from '../../state/groceriesSlice/requestsModels';

type InputFieldProps = {
    input?: string;
    values: IngredientType[];
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSelect: (i: IngredientType) => void;
    icon?: string;
    name: string;
}
const SearchField: React.FC<InputFieldProps> = ({input, values, placeholder, name, onChange, onSelect}) => {

	return (
		<div className='search-container'>
			<InputField name={name} onChange={onChange} placeholder={placeholder} value={input}/>
			{values.length > 0 &&
                <div className='select'>
                	{values.map((element) => <div key={element.id} className='select-item'
                		onClick={() => onSelect(element)}>{element.name}</div>)}
                </div>
			}
		</div>
	);
};

export default SearchField;
