import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
// import 'surface/prod/css/surface_styles.css';
import './assets/styles/main.scss';
require('smoothscroll-polyfill').polyfill();
import ReactDOM from 'react-dom';
import React from 'react';
import Routes from './components/routes/Routes'

ReactDOM.render(<Routes/>, document.querySelector('#root'));



// function render() {
//   const greeterComponent = ;
//
//
// }

// render();
// ReactDOM.render(<Root/>, document.getElementById('root'));
