/*
    Top-level index page. To use React Router, we need the BrowserRouter component
    wrapping around our main App component
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import 'semantic-ui-css-offline/semantic.min.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './js/store';
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
