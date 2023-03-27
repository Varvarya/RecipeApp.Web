import React, {ChangeEvent, useState} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import MailIcon from '../../assets/Icons/MailIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import RepeatPasswordIcon from '../../assets/Icons/RepeatPasswordIcon.png';
import Button from '../../components/button';
import {Link, useHistory} from 'react-router-dom';
import {loginAction, registrationAction} from '../../state/loginSlice/actions';
import {connect} from 'react-redux';
import {loginModel, regisrationModel} from '../../state/loginSlice/requestsModels';

type RegistrationPageProps ={
	register: (data: regisrationModel) => any,
	login: (data: loginModel) => void,
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({register, login}) => {
	const history = useHistory();

	const [formData, setFormData] = useState<regisrationModel>({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		clientURIForEmailConfirmation: 'http://localhost:4200'
	});

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const registerUser = () => {
		register(formData).then((res: any) => {
			if (res) {
				login({username: formData.userName, password: formData.password});
				history.push('/home');
			}
		});
	};

	return (
		<div className='background'>
			<Window title={'Registration'}>
				<InputField
					name='userName'
					value={formData.userName}
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
					name='confirmPassword'
					value={formData.confirmPassword}
					placeholder={'Repeat your password...'}
					onChange={changeInputData}
					icon={RepeatPasswordIcon}
					isPassword
				/>
				<Button text={'Register'} onClick={registerUser} color={'opposite'}/>
				<h3>Already have an account? <Link to={'/login'}>Log in</Link></h3>
			</Window>
		</div>
	);
};

const mapStateToProps = null;
const mapDispatchToProps = {
	register: registrationAction,
	login: loginAction
};

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationPage);
