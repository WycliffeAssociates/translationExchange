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
import Login from "./js/pages/user/login";
import { DragDropContext } from "react-dnd";
import Notifications from 'react-notify-toast';
import { default as TouchBackend } from 'react-dnd-touch-backend';



class App extends Component {
	constructor(props) {
		super(props);

		//configuration for web requests
		axios.defaults.timeout = 20000;
	}





	render() {
		return (
			/*
                This is a list of different possible routes and what components should
                be rendered for each one
             */

			<div>
				 <Notifications />
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/projects" component={ProjectsListContainer} />
					<Route exact path="/chapters" component={ChaptersContainer} />
					<Route exact path="/takes" component={ChunkListContainer} />
					<Route exact path="/user" component={User} />
					<Route exact path="/login" component={Login} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
