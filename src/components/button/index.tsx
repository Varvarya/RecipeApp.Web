import React from 'react';
import Loader from '../loader';
import './styles.scss';

type ButtonProps = {
    text: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    color?: 'accent' | 'opposite' | 'red';
    testid?: string;
    size?: 'small' | 'standard';
    form?: 'round' | 'default';
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	loading = false,
	color = 'accent',
	testid,
	size = 'standard',
	disabled = false,
	form = 'default'
}) => {
	return (
		<div data-testid={testid}
			className={'button ' + color + ' ' + size + ' ' + (disabled ? 'disabled' : 'active') + ' ' + form}
			onClick={onClick}>{loading ?
				<Loader/> : text}</div>
	);
};

export default Button;
