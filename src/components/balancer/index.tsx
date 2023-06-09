import React from 'react';
import './styles.scss';

type BalancerProps = {
    minValName: string,
    maxValName: string,
    minVal: number,
    maxVal: number,
    onChange: any
}
const Balancer: React.FC<BalancerProps> = ({
	minValName, maxValName,
	minVal, maxVal, onChange
}) => {

	return (
		<div className='row'>
			<h5>{minValName}</h5>
			<input name={minValName} type='number' value={minVal} onChange={onChange}/>
			<h5>{maxValName}</h5>
			<input name={maxValName} type='number' value={maxVal} onChange={onChange}/>
		</div>
	);
};

export default Balancer;
