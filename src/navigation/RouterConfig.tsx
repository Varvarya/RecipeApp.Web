import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import RegistrationPage from '../pages/register';

const RouterConfig = () => {
	return (
		<Switch>
			<Route path='/login'><Login /></Route>
			<Route path='/register'><RegistrationPage /></Route>
		</Switch>
	);
};

export default RouterConfig;
