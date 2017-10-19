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
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { default as TouchBackend } from 'react-dnd-touch-backend';

//import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'; // or any other pipeline
//import MultiBackend, {  TouchTransition } from 'react-dnd-multi-backend';
//import objectAssign from 'object-assign';




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


// const HTML5toTouch = {
//   backends: [
//     {
//       backend: HTML5Backend
//     },
//     {
//       backend: TouchBackend({enableMouseEvents: true}), // Note that you can call your backends with options
//       preview: true,
//       transition: TouchTransition
//     }
//   ]
// };

 export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(App);
//  export default DragDropContext(MultiBackend(HTML5toTouch))(App);
