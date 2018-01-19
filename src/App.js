import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ChunkListContainer from "./js/pages/chunks/ChunkListContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ChaptersContainer from "./js/pages/chapters/ChaptersContainer";
import "./App.css";
import config from "./../src/config/config"
import NotFound from "./js/pages/NotFound";
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";
import axios from "axios";
import User from "./js/pages/user/user";
import { DragDropContext } from "react-dnd";
import Raven from 'raven-js';
import {sentry_url} from './config/sentryConfig';

import { default as TouchBackend } from 'react-dnd-touch-backend';
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);







class App extends Component {
	constructor(props) {
		super(props);

		//configuration for web requests
		axios.defaults.timeout = 20000;
	}

	componentDidCatch(error, errorInfo) {

        Raven.captureException(error, { extra: errorInfo });
				console.log('componentDidCatch worked')
				debugger;
    }


	componentWillMount()
 {
		Raven.config('https://3e40903e6ade4a9591bfc8a8fa779632@sentry.io/273977').install();
 }


	startErrorLog()
	{


		axios.post(`https://hooks.slack.com/services/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`, {"text": "Message from te"})
		.then( response => {
				debugger;
			})
			.catch(error => {

	});
  
      const online = navigator.onLine;

			window.addEventListener('unhandledrejection', event => {
				// Prevent error output on the console:
				event.preventDefault();

        if(online){
					axios.post(`https://hooks.slack.com/services/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`, {"text": "Message from te"})
					.then( response => {
 							debugger;
						})
						.catch(error => {

				});
					debugger;
				}else{
					axios.post(`${config.apiUrl}frontend_log/`, {log: event.reason.stack.toString()})
					.then( response => {

						})
						.catch(error => {

				});


				}


				});

	    window.onerror = (message,file,line,column,errorObject) =>
	    {
	        column = column || (window.event && window.event.errorCharacter);
	        let stack = errorObject ? errorObject.stack : null;

	        //trying to get stack from IE
	        if(!stack)
	        {
	            let stack = [];
	            let f = arguments.callee.caller;
	            while (f)
	            {
	                stack.push(f.name);
	                f = f.caller;
	            }
	            errorObject['stack'] = stack;
	        }

	        const data = {
	            message:message,
	            file:file,
	            line:line,
	            column:column,
	            errorStack:stack,
	        };
					const str = data.toString();
					debugger;

					axios.post(`${config.apiUrl}frontend_log/`, {log: str})
   				.then( response => {
   					})
   					.catch(error => {

   			});

	        //here I make a call to the server to log the error

	        //the error can still be triggered as usual, we just wanted to know what's happening on the client side
	        return false;
	    }
	}





	render() {
		return (
			/*
                This is a list of different possible routes and what components should
                be rendered for each one
             */

			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/projects" component={ProjectsListContainer} />
					<Route exact path="/chapters" component={ChaptersContainer} />
					<Route exact path="/takes" component={ChunkListContainer} />
					<Route exact path="/user" component={User} />
					<Route path="*" component={NotFound} />
				</Switch>


			</div>
		);
	}
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
