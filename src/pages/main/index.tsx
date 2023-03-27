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
import NavBar from '../../components/navBar';

type LoginPageProps ={
	login: (data: {username: string, password: string}) => void,
}

const MainPage: React.FC<LoginPageProps> = ({login}) => {
	const [formData, setFormData] = useState({
		username: 'Varvara Tisheninova',
		password: 'Password',
	});

	const changeInputData = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	return (
		<div className='background'>
			<NavBar />
		</div>
	);
};

const mapStateToProps = null;
const mapDispatchToProps = {
	login: loginAction
};

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);
