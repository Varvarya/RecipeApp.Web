import React, {ReactElement} from 'react';
import './styles.scss';

type WindowProps = {
	title: string;
	children: ReactElement[];
}

const Window: React.FC<WindowProps> = ({title, children}) => {
	return (
		<div className='container'>
			<div className='controls'>
				<div className='control-accept' />
				<div className='control-hide' />
				<div className='control-close' />
			</div>
			<div className='content-container'>
				<h1>{title}</h1>
				<div className='children-container'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Window;
