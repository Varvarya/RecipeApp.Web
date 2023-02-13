import React, {ChangeEvent } from 'react';
import './styles.scss';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';

type InputFieldProps = {
	value: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	icon: string;
	name: string;
	isPassword?: boolean
}
const InputField: React.FC<InputFieldProps> = ({value, placeholder, onChange, icon, name, isPassword = false}) => {
	const { passwordVisibility, rightIcon, handlePasswordVisibility } =
		isPassword? useTogglePasswordVisibility() : { passwordVisibility: true, rightIcon: null, handlePasswordVisibility: undefined};

	return (
		<div className='input-row'>
			<img className='icon' src={icon}/>
			<div className='input'>
				<input className='input-override' name={name} placeholder={placeholder} value={value} onChange={onChange} type={passwordVisibility? 'text' : 'password'}/>
				{isPassword && rightIcon && <img className='rightIcon' src={rightIcon} onClick={handlePasswordVisibility}/>}
			</div>
		</div>
	);
};

export default InputField;
