import React, {ChangeEvent} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import Button from '../../components/button';
import {Link} from 'react-router-dom';
import {loginModel} from '../../state/loginSlice/requestsModels';
import {SerializedError} from '@reduxjs/toolkit';
import {APIError} from '../../state/types';
import ErrorText from '../../components/typography';

export type LoginPageProps = {
    login: () => any,
    error?: APIError | SerializedError,
    loading: boolean,
    onUsernameChange: (e: ChangeEvent<HTMLInputElement>) => any,
    onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => any,
    formData: loginModel,
    isValid: boolean
}

const LoginPage: React.FC<LoginPageProps> = ({
	login,
	error,
	loading,
	onUsernameChange,
	onPasswordChange,
	formData,
	isValid
}) => {
	return (
		<form className='background' data-testid="login-form">
			<Window title={'Login'}>
				<InputField
					name='username'
					testid="username"
					value={formData.username}
					placeholder={'Enter your username...'}
					onChange={onUsernameChange}
					icon={UserIcon}
					isValid={isValid}
				/>
				<InputField
					name='password'
					testid="password"
					value={formData.password}
					placeholder={'Enter your password...'}
					onChange={onPasswordChange}
					icon={PasswordIcon}
					isPassword
					isValid={isValid}
				/>
				<h4><a>Forgot your password?</a></h4>
				{(!isValid)
					? <ErrorText text={'Check your username and password'}/>
					: <></>}
				<Button testid={'submit'} text={'Log in'} onClick={login} loading={loading}/>
				<h3>New here? <Link to={'/register'}>Create an Account</Link></h3>
			</Window>
		</form>
	);
};

export default LoginPage;
