import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

const defaultState = {
	appName: 'conduit',
	articles: null
};

const reducer = function(state = defaultState, action){
	return state;
};

const store = createStore(reducer);



ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
		), document.getElementById('root'));
registerServiceWorker();
