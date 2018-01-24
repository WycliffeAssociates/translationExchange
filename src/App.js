import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ChunkListContainer from "./js/pages/chunks/ChunkListContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ChaptersContainer from "./js/pages/chapters/ChaptersContainer";
import "./App.css";
import config from "./config/config"
import NotFound from "./js/pages/NotFound";
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";
import axios from "axios";
import User from "./js/pages/user/user";
import { DragDropContext } from "react-dnd";
import Raven from 'raven-js';
import CrashReporter from './crashReporter'

import { default as TouchBackend } from 'react-dnd-touch-backend';
const MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);
const SENTRY_URL = 'https://88334842aa79457baf6c939141ec062c@sentry.io/276208';
//const OFFLINE_QUEUE_INTERVAL = 25000;  //25 seconds
//const sentryOffline = JSON.parse(window.localStorage.sentryOffline);

var ravenOptions =
{
	/*
	    Configurations for Raven for offline capabilities. ravenOptions will
	    call the callback function and pass in the error message 'data' that
	    should be sent to Sentry. If there is no internet connection, then it 
	    won't send the error message.
	*/
	shouldSendCallback:
	    function(data)
	    {
		/*
		     Verify whether the user is connected to the internet and if 
		     Raven is configured. If so, then let Raven capture any 
		     messages that may have been stored offline in local storage. 
		     If not, then add the new error message to local storage as well
	        */
	        if(navigator.onLine && Raven.isSetup())
	        {
		    for(var storageIndex = 0; 
			    storageIndex < localStorage.length; 
			    storageIndex++)
		    {
		        localStorage.getItem(localStorage.key(storageIndex))
			    .then( function (log)
			           {
				       Raven.captureMessage('', log);
				       localStorage.removeItem(localStorage.key(storageIndex));
				   }
			         );
		    }
	            return true;
		}
		else 
		{
		    localStorage.setItem(data);  //unsure about this line
		    return false;
		}
	    }
}

class App extends Component 
{
    constructor(props) 
    {
        super(props);
	//configuration for web requests
	axios.defaults.timeout = 20000;
    }

    componentDidCatch(error, errorInfo) 
    {
        Raven.captureException(error, { extra: errorInfo });
	console.log('componentDidCatch worked');
	debugger;
    }

    componentWillMount()
    {
        Raven.config(SENTRY_URL, ravenOptions).install();
    }

    render() 
    {
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





/*
   
   
    startErrorLog()
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
    }
        const online = navigator.onLine;
        window.addEventListener(
	    'unhandledrejection', 
	     event => 
	     {
	         // Prevent error output on the console:
	         event.preventDefault();
                 if(online)
		 {
		     axios.post(
		         'https://hooks.slack.com/services/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', 
			  {"text": "Message from te"}
		     ).then( 
		               response => 
			       {
 			           debugger;
			       }
		           ).catch( error => { });
		     debugger;
		  } else
		    {
		        axios.post('${config.apiUrl}frontend_log/', 
				   {log: event.reason.stack.toString()}
			          ).then( 
				        response => { }
				  ).catch(
			                error => { }
				     );
		    }


	     }
	);

	window.onerror = 
	    (message,file,line,column,errorObject) =>
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
*/
