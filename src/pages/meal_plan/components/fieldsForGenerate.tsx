import ModalWindow from '../../../components/modalWindow';
import React from 'react';
import Button from '../../../components/button';


type GenerateInfoProps = {
    close: () => void,
    values: { name: string; value: number | boolean; step: number; type: string; }[],
    changeValue: (name: string, value: number | boolean) => void,
    onClick: () => void,
    loading: boolean
}

const GenerateInfo: React.FC<GenerateInfoProps> = ({close, values, changeValue, onClick, loading}) => {
	return (
		<ModalWindow title={'Generate'} close={close}>
			<div>
				{values.map((el, i) => el.type === 'number' && typeof el.value === 'number' ?
					(<span key={i}>
						<h4>{el.name}</h4>
						<input
							value={el.value}
							onChange={(e) => changeValue(el.name, parseInt(e.target.value))}
							type={el.type}
						/>
					</span>)
					: (
						<span key={i}>
							<h4>{el.name}</h4>
							<input
								checked={!!el.value}
								onChange={(e) => changeValue(el.name, el.value)}
								type={el.type}
							/>
						</span>
					)
				)}
				<Button text={'Generate'} onClick={onClick} loading={loading}/>
			</div>
		</ModalWindow>);
};

export default GenerateInfo;
