/*
    Top-level index page. To use React Router, we need the BrowserRouter component
    wrapping around our main App component
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
