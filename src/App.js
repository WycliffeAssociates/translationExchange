/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChapterContainer from "./js/views/takes/ChapterContainer";
import ProjectsListContainer from "./js/views/projects/ProjectsListContainer";
import ProjectContainer from "./js/views/chapters/ProjectContainer";
import './App.css';
import Header from "./js/components/header";
import Home from "./js/views/home/home";
import About from "./js/views/about/about";

class App extends Component {

    render() {
        return (
            /*
                This is a list of different possible routes and what components should
                be rendered for each one
             */

            <div>

            <Header/>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/projects/:projectid' component={ProjectContainer}/>
                <Route exact path='/projects/:projectid/ch:chid' component={ChapterContainer}/>
            </Switch>

            {/*<Footer/>*/}

            </div>

        );
    }

}

export default App;

