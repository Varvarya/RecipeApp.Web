import React, {useState} from 'react';
import './styles.scss';
import {useHistory} from 'react-router-dom';
import {loginAction} from '../../state/loginSlice/actions';
import {connect, useSelector} from 'react-redux';
import {loginModel} from '../../state/loginSlice/requestsModels';
import {selectToken} from '../../state/loginSlice';
import {Action, isFulfilled, SerializedError} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {APIError} from '../../state/types';
import LoginPage from './loginPage';

export type LoginPageProps = {
    login: (data: loginModel) => any,
    error?: APIError | SerializedError,
    loading: boolean,
}

const Login: React.FC<LoginPageProps> = ({login, error, loading}) => {
	const history = useHistory();
	const loginState = useSelector(selectToken);

	const [formData, setFormData] = useState<loginModel>({
		username: '',
		password: '',
	});


	const [isValid, setIsValid] = useState(!error || formData.username.length == 0 || formData.password.length == 0);

	const changeInputData = (prop: string, value: string) => {
		setFormData({...formData, [prop]: value});
		if (value.length == 0) setIsValid(true);
	};

	const loginUser = () => {
		login(formData).then((res: Action) => {
			if (isFulfilled(res)) {
				history.push('/home');
			}
		});
	};

	return (
		<LoginPage login={loginUser} loading={loading}
			onUsernameChange={(e) => changeInputData('username', e.target.value)}
			onPasswordChange={(e) => changeInputData('password', e.target.value)} formData={formData}
			isValid={isValid}/>
	);
};

const mapStateToProps = ({login}: RootState) => ({
	error: login.error,
	loading: login.loading
});
const mapDispatchToProps = {
	login: loginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

export {Login};
