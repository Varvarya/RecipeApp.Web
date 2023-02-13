import React, {ChangeEvent, useState} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import Button from '../../components/button';
import {Link} from 'react-router-dom';
import {loginAction} from '../../state/loginSlice/actions';
import { connect } from 'react-redux';

type LoginPageProps ={
	login: (data: {username: string, password: string}) => void,
}

const LoginPage: React.FC<LoginPageProps> = ({login}) => {
	const [formData, setFormData] = useState({
		username: 'Varvara Tisheninova',
		password: 'Password',
	});

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
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
				/>
				<InputField
					name='password'
					value={formData.password}
					placeholder={'Enter your password...'}
					onChange={changeInputData}
					icon={PasswordIcon}
					isPassword
				/>
				<Button text={'Log in'} onClick={() => login(formData)}/>
				<h3>New here? <Link to={'/register'}>Create an Account</Link></h3>
			</Window>
		</div>
	);
};

const mapStateToProps = null;
const mapDispatchToProps = {
	login: loginAction
};

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
