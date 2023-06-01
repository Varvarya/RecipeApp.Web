import React, {ChangeEvent, MouseEventHandler } from 'react';
import './styles.scss';
import InputField from '../inputField';

type ErrorTextProps = {
    text: string
}
const ErrorText: React.FC<ErrorTextProps> = ({text}) => {
	return (
		<h4 className='error-text'>{text}</h4>
	);
};

export default ErrorText;
