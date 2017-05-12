import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import './assets/styles/main.scss';
import ReactDOM from 'react-dom';
import React from 'react';
import Routes from './components/routes/Routes';
import store from './store';
import { Provider } from 'react-redux';
require('smoothscroll-polyfill').polyfill();

ReactDOM.render(
  <Provider store={ store }>
    <Routes />
  </Provider>,
  document.querySelector('#root')
);

