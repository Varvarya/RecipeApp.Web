import React, {ReactElement} from 'react';
import './styles.scss';

type ModalWindowProps = {
	title: string;
	close?: () => void;

	children: ReactElement[] | ReactElement;
}

const ModalWindow: React.FC<ModalWindowProps> = ({title, children, close}) => {

	return (
		<div className='pop-up-container' onClick={close}>
			<div className='pop-up-content' onClick={e => e.stopPropagation()}>
				<div className='controls'>
					<div className='control-accept' />
					<div className='control-hide' />
					<div className='control-close' onClick={close}/>
				</div>
				<div className='content-container'>
					<h1>{title}</h1>
					<div className='children-container'>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalWindow;
