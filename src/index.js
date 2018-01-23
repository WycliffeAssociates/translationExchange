/*
    Top-level index page. To use React Router, we need the BrowserRouter component
    wrapping around our main App component
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";


import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./js/store";
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
