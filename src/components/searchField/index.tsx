import React, {ChangeEvent, MouseEventHandler } from 'react';
import './styles.scss';
import InputField from '../inputField';

type InputFieldProps = {
	input?: string;
	values: string[];
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	icon?: string;
	name: string;
}
const SearchField: React.FC<InputFieldProps> = ({input, values, placeholder, name, onChange, onSelect}) => {
	const arr = [1, 2, 3, 4];

	return (
		<div className='search-container'>
			<InputField  name={name} onChange={onChange} placeholder={placeholder} value={input}/>
			{values.length > 0 &&
				<div className='select'>
					{values.map((e) => <div key={e} className='select-item' onClick={onSelect}>{e}</div>)}
				</div>
			}
		</div>
	);
};

export default SearchField;
