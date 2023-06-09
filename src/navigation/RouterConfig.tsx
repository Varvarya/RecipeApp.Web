import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Login from '../pages/login';
import RegistrationPage from '../pages/register';
import Main from '../pages/main';
import GroceriesPage from '../pages/groceries';
import UserProfilePage from '../pages/profile';
import Recipes from '../pages/recipes';
import MealPlans from '../pages/meal_plan';

const RouterConfig = () => {
	const userToken = sessionStorage.getItem('token');

	return (
		<Switch>
			<Route exact path='/'>{userToken !== undefined ?
				<Redirect to={'/home'}/> :
				<Redirect to={'/login'}/>}</Route>
			<Route path='/home'><Main/></Route>
			<Route path='/login'><Login/></Route>
			<Route path='/register'><RegistrationPage/></Route>

			<Route path='/meal_plans'><MealPlans/></Route>
			<Route path='/recipes'><Recipes/></Route>
			<Route path='/groceries'><GroceriesPage/></Route>
			<Route path='/profile'><UserProfilePage/></Route>
		</Switch>
	);
};

export default RouterConfig;
