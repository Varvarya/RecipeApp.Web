import React from 'react';
import Loader from '../loader';
import './styles.scss';

type ButtonProps = {
	text: string;
	onClick: () => void;
	loading?: boolean;
	color?: 'accent' | 'opposite';
}

const Button: React.FC<ButtonProps> = ({text, onClick, loading = false, color='accent'}) => {
	return (
		<div className={'button '+color} onClick={onClick}>{loading ? <Loader /> : text}</div>
	);
};

export default Button;
