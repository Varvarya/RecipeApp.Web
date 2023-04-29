import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import RegistrationPage from '../pages/register';
import Main from '../pages/main';
import GroceriesPage from '../pages/groceries';
import UserProfilePage from '../pages/profile';

const RouterConfig = () => {
	return (
		<Switch>
			<Route exact path='/home'><Main /></Route>
			<Route path='/login'><Login /></Route>
			<Route path='/register'><RegistrationPage /></Route>
			<Route path='/groceries'><GroceriesPage /></Route>
			<Route path='/profile'><UserProfilePage /></Route>
		</Switch>
	);
};

export default RouterConfig;
