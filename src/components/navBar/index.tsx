import React, {ChangeEvent } from 'react';
import './styles.scss';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';
import {Link} from 'react-router-dom';

type NavBarFieldProps = any
const NavBar: React.FC<NavBarFieldProps> = () => {

	return (
		<div className='navbar'>
			<div className='nav-container'>
				<text className='nav-el'>Receipts</text>
				<Link to={'/groceries'}><text className='nav-el'>Groceries</text></Link>
				<text className='nav-el'>Home</text>
			</div>
		</div>

	);
};

export default NavBar;
