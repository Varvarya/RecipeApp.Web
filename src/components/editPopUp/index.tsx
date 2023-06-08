import React from 'react';
import './styles.scss';
import InputField from '../inputField';
import Button from '../button';

type WindowProps = {
    title: string;
    fields: any;
    editFields: (value: { name: string, value: string }) => void;
    onClick: () => void;
    close?: () => void;
}

const EditPopUp: React.FC<WindowProps> = ({title, fields, editFields, onClick, close}) => {
	console.log(fields);
	const displayedFields = Object.entries(fields).filter((e) => e[0] !== 'id' && typeof e[1] !== 'object');


	return (
		<div className='pop-up-container' onClick={undefined}>
			<div className='pop-up-content' onClick={undefined}>
				<div className='controls'/>
				<div className='content-container'>
					<h1>{title}</h1>
					<div className='children-container'>
						{displayedFields.map((e: any, i: number) => <InputField key={i} value={e[1] || ''}
							name={e[0]}
							label={e[0]}
							onChange={(value) => editFields({
								name: e[0],
								value: value.target.value
							})}
							placeholder={e[0]}></InputField>)}
					</div>

					<Button text={title} onClick={onClick}/>
				</div>
			</div>
		</div>
	);
};

export default EditPopUp;
