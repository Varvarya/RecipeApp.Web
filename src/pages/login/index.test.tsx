import {fireEvent, render} from '@testing-library/react';
import LoginPage, {LoginPageProps} from './loginPage';
import React, {ChangeEvent} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

const renderLoginForm = (props?: Partial<LoginPageProps>) => {
	const defaultProps: LoginPageProps = {
		login() {
			return;
		},
		loading: false,
		onUsernameChange(e: ChangeEvent<HTMLInputElement>) {
			return;
		},
		onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
			return;
		},
		formData: {username: '', password: ''},
		isValid: true,
	};
	return render(
		<Router>
			<LoginPage {...defaultProps} {...props} />
		</Router>);
};

describe('<LoginForm />', () => {
	test('should display a blank login form, with remember me checked by default', async () => {
		const {findByTestId} = renderLoginForm();

		const loginForm = await findByTestId('login-form');

		expect(loginForm).toHaveFormValues({
			username: '',
			password: '',
		});
	});

	test('should allow entering a username', async () => {
		const onUsernameChange = jest.fn();
		const {findByTestId} = renderLoginForm({onUsernameChange});
		const username = await findByTestId('username');

		fireEvent.change(username, {target: {value: 'username'}});

		expect(onUsernameChange).toHaveBeenCalledTimes(1);
	});

	test('should allow entering a username', async () => {
		const onPasswordChange = jest.fn();
		const {findByTestId} = renderLoginForm({onPasswordChange});
		const password = await findByTestId('password');

		fireEvent.change(password, {target: {value: 'password'}});

		expect(onPasswordChange).toHaveBeenCalledTimes(1);
	});

	test('should submit the form with username, password, and remember', async () => {
		const login = jest.fn();
		const {findByTestId} = renderLoginForm({
			login,
		});
		const username = await findByTestId('username');
		const password = await findByTestId('password');
		const submit = await findByTestId('submit');

		fireEvent.change(username, {target: {value: 'username'}});
		fireEvent.change(password, {target: {value: 'password'}});
		fireEvent.click(submit);

		expect(login).toHaveBeenCalledTimes(1);
	});
});
