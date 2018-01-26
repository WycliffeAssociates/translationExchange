import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ChunkListContainer from "./js/pages/chunks/ChunkListContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ChaptersContainer from "./js/pages/chapters/ChaptersContainer";
import "./App.css";
import NotFound from "./js/pages/NotFound";
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";
import axios from "axios";
import User from "./js/pages/user/user";
import { DragDropContext } from "react-dnd";
import Raven from 'raven-js';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { SENTRY_URL } from './../src/config/config';

Raven.config(SENTRY_URL).install();

//const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
//const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);
//const SENTRY_URL = 'https://88334842aa79457baf6c939141ec062c@sentry.io/276208';
//const sentryOffline = JSON.parse(window.localStorage.sentryOffline);

/*function removeMessageFromLocalStorage(log, index)
{
    Raven.captureMessage('', log);
    localStorage.removeItem(localStorage.key(index));
}

var ravenOptions =
{
	
	    Configurations for Raven for offline capabilities. ravenOptions will
	    call the callback function and pass in the error message 'data' that
	    should be sent to Sentry. If there is no internet connection, then it 
	    won't send the error message.
	
	shouldSendCallback:
	    function(data)
	    {
		//verify whether the user has an internet connection
		    //and if Raven is configured
	        if(navigator.onLine && Raven.isSetup())
	        {
		    for(var storageIndex = 0; 
		    	storageIndex < localStorage.length;
		    	storageIndex++)
		    {
		        removeMessageFromLocalStorage(
				localStorage.getItem(localStorage.key(storageIndex)), 
				storageIndex);
		    }
	            return true;
		}
		else 
		{
		    //should add 'data' to the local storage if no internet
			//connection is available
		    localStorage.setItem(data);  //unsure about this line
		    return false;
		}
	    }
}*/

class App extends Component 
{
    constructor(props) 
    {
        super(props);
	//configuration for web requests
	axios.defaults.timeout = 20000;
    }

   /* componentDidCatch(error, errorInfo) 
    {
        Raven.captureException(error, { extra: errorInfo });
	console.log('componentDidCatch worked');
	debugger;
    }

    componentWillMount()
    {
        //Raven.config(SENTRY_URL, ravenOptions).install();
    }

   /* startErrorLog()
    {
        document.addEventListener(
	    'ravenFailure', 
	    ({data}) => 
	    {
                // We can't store too much data
                //if (sentryOffline.length < 10) 
		//{
		    //sentryOffline.push(data);
                //window.localStorage.sentryOffline = JSON.stringify(sentryOffline);
                //}
            }
	);
    }*/





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
