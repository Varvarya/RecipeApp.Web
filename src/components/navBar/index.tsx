import React from 'react';
import './styles.scss';
import {Link} from 'react-router-dom';

type NavBarFieldProps = any
const NavBar: React.FC<NavBarFieldProps> = () => {

	return (
		<div className='navbar'>
			<div className='nav-container'>
				<Link to={'/meal_plans'}>
					<text className='nav-el'>Meal plans</text>
				</Link>
				<Link to={'/recipes'}>
					<text className='nav-el'>Recipes</text>
				</Link>
				<Link to={'/groceries'}>
					<text className='nav-el'>Groceries</text>
				</Link>
				<Link to={'/profile'}>
					<text className='nav-el'>Me</text>
				</Link>
				<text className='nav-el'>Home</text>
			</div>
		</div>

	);
};

export default NavBar;
