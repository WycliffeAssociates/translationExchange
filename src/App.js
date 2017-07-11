/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChapterContainer from "./js/pages/takes/ChapterContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ProjectContainer from "./js/pages/chapters/ProjectContainer";
import './App.css';
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";

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

