import React, {ChangeEvent, useState} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import MailIcon from '../../assets/Icons/MailIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import RepeatPasswordIcon from '../../assets/Icons/RepeatPasswordIcon.png';
import Button from '../../components/button';
import {Link} from 'react-router-dom';

const RegistrationPage = () => {
	const [formData, setFormData] = useState({
		username: 'Varvara Tisheninova',
		email: 'varvara.tisheninova@nure.ua',
		password: 'Password',
		repeatPassword: 'Password',
	});

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	return (
		<div className='background'>
			<Window title={'Registration'}>
				<InputField
					name='username'
					value={formData.username}
					placeholder={'Enter your username...'}
					onChange={changeInputData}
					icon={UserIcon}
				/>
				<InputField
					name='email'
					value={formData.email}
					placeholder={'Enter your email...'}
					onChange={changeInputData}
					icon={MailIcon}
				/>
				<InputField
					name='password'
					value={formData.password}
					placeholder={'Enter your password...'}
					onChange={changeInputData}
					icon={PasswordIcon}
					isPassword
				/>
				<InputField
					name='repeatPassword'
					value={formData.repeatPassword}
					placeholder={'Repeat your password...'}
					onChange={changeInputData}
					icon={RepeatPasswordIcon}
					isPassword
				/>
				<Button text={'Register'} onClick={() => console.log(formData)} color={'opposite'}/>
				<h3>Already have an account? <Link to={'/login'}>Log in</Link></h3>
			</Window>
		</div>
	);
};

export default RegistrationPage;
