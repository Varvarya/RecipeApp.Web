import React from 'react';
import './styles.scss';

type ButtonProps = {
	text: string;
	onClick: () => void;
	color?: 'accent' | 'opposite';
}

const Button: React.FC<ButtonProps> = ({text, onClick, color='accent'}) => {
	return (
		<div className={'button '+color} onClick={onClick}>{text}</div>
	);
};

export default Button;
