import React, {ChangeEvent} from 'react';
import './styles.scss';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';

type InputFieldProps = {
    value?: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: string;
    name: string;
    isPassword?: boolean;
    isValid?: boolean;
    label?: string;

    testid?: string
}
const InputField: React.FC<InputFieldProps> = ({
	value,
	label,
	placeholder,
	onChange,
	icon,
	name,
	isPassword = false,
	isValid = true,
	testid
}) => {
	const {passwordVisibility, rightIcon, handlePasswordVisibility} =
        isPassword ? useTogglePasswordVisibility() : {
        	passwordVisibility: true,
        	rightIcon: null,
        	handlePasswordVisibility: undefined
        };

	return (
		<div className='input-row'>
			{icon && <img className='icon' src={icon}/>}
			<div className='column'>
				{label && <h4>{label}</h4>}
				<div className={isValid ? 'input' : 'input input-error'}>
					<input data-testid={testid} className={isValid ? 'input-override' : 'input-override error'}
						name={name}
						placeholder={placeholder} value={value || ''} onChange={onChange}
						type={passwordVisibility ? 'text' : 'password'}/>
					{isPassword && rightIcon &&
                        <img className='rightIcon' src={rightIcon} onClick={handlePasswordVisibility}/>}
				</div>
			</div>
		</div>
	);
};

export default InputField;
