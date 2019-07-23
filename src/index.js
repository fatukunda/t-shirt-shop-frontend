import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';
import App from './App';
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
