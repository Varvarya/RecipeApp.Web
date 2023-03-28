import React, {ChangeEvent, useState} from 'react';
import './styles.scss';
import Window from '../../components/window';
import InputField from '../../components/inputField';
import UserIcon from '../../assets/Icons/UserIcon.png';
import PasswordIcon from '../../assets/Icons/PasswordIcon.png';
import Button from '../../components/button';
import {Link, useHistory} from 'react-router-dom';
import {loginAction} from '../../state/loginSlice/actions';
import { connect } from 'react-redux';
import {loginModel} from '../../state/loginSlice/requestsModels';

type LoginPageProps ={
	login: (data: loginModel) => any,
}

const LoginPage: React.FC<LoginPageProps> = ({login}) => {
	const history = useHistory();

	const [formData, setFormData] = useState<loginModel>({
		username: '',
		password: '',
	});

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const loginUser = () => {
		login(formData).then((res: any) => {
			if (res) {
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
				/>
				<InputField
					name='password'
					value={formData.password}
					placeholder={'Enter your password...'}
					onChange={changeInputData}
					icon={PasswordIcon}
					isPassword
				/>
				<Button text={'Log in'} onClick={loginUser}/>
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
