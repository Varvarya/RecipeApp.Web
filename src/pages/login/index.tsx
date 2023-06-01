import React, {ChangeEvent, useState} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import Button from '../../components/button';
import {Link, useHistory} from 'react-router-dom';
import {loginAction} from '../../state/loginSlice/actions';
import {connect, useSelector} from 'react-redux';
import {loginModel} from '../../state/loginSlice/requestsModels';
import {selectToken} from '../../state/loginSlice';
import {Action, isFulfilled, SerializedError} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {APIError} from '../../state/types';
import ErrorText from '../../components/typography';

type LoginPageProps ={
	login: (data: loginModel) => any,
	error?: APIError | SerializedError,
	loading: boolean
}

const LoginPage: React.FC<LoginPageProps> = ({login, error, loading}) => {
	const history = useHistory();
	const loginState = useSelector(selectToken);

	const [formData, setFormData] = useState<loginModel>({
		username: '',
		password: '',
	});


	const [isValid, setIsValid] = useState(!error || formData.username.length == 0 || formData.password.length == 0 );

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
		if (e.target.value.length == 0) setIsValid(true);
	};

	const loginUser = () => {
		login(formData).then((res: Action) => {
			if (isFulfilled(res)) {
				history.push('/home');
			}
		});
	};

	return (
		<div className='background'>
			<Window title={'Login'}>
				<InputField
					name='username'
					value={formData.username}
					placeholder={'Enter your username...'}
					onChange={changeInputData}
					icon={UserIcon}
					isValid={isValid}
				/>
				<InputField
					name='password'
					value={formData.password}
					placeholder={'Enter your password...'}
					onChange={changeInputData}
					icon={PasswordIcon}
					isPassword
					isValid={isValid}
				/>
				{(!isValid)
					? <ErrorText text={'Check your username and password'} />
					: <></>}
				<Button text={'Log in'} onClick={loginUser} loading={loading} />
				<h3>New here? <Link to={'/register'}>Create an Account</Link></h3>
			</Window>
		</div>
	);
};

const mapStateToProps = ({login} : RootState) => ({
	error: login.error,
	loading: login.loading
});
const mapDispatchToProps = {
	login: loginAction
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
