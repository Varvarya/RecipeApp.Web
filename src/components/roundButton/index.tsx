import React from 'react';
import './styles.scss';

type ButtonProps = {
    text: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    color?: 'accent' | 'base';
    testid?: string;
}

const Button: React.FC<ButtonProps> = ({
	text,
	onClick,
	color = 'accent',
	testid,
	disabled = false,
}) => {
	return (
		<div data-testid={testid}
			className={'button ' + color + ' ' + (disabled ? 'disabled' : 'active') + ' round'}
			onClick={onClick}>{text}</div>
	);
};

export default Button;
