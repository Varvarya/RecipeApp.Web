import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './navigation/RouterConfig';
import store from './state/store';
import store_conf from './state/index';

store_conf.interceptor(store);
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<RouterConfig />
			</Router>
		</Provider>
	);
};
export default App;
