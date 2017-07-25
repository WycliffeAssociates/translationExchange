/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChapterContainer from "./js/pages/takes/ChapterContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ProjectContainer from "./js/pages/chapters/ProjectContainer";
import './App.css';
import NotFound from "./js/pages/404Error";
import Header from "./js/components/header";
import Home from "./js/pages/home/home";
import About from "./js/pages/about/about";
import axios from 'axios'

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

            <Header/>

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/about' component={About}/>
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/chapters' component={ProjectContainer}/>
                <Route exact path='/takes' component={ChapterContainer}/>
                <Route path='*' component={NotFound} />
            </Switch>

            {/*<Footer/>*/}

            </div>

        );
    }

}

export default App;

