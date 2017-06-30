/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChapterContainer from "./js/pages/chapter/ChapterContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ProjectContainer from "./js/pages/projects/ProjectContainer";
import './App.css';
import Header from "./js/layout/header";
import Footer from "./js/layout/footer";
import Home from "./js/pages/home";
import AudioSearchBar from "./AudioSearchBar";
import About from "./js/pages/about";

class App extends Component {

    render() {
        return (
            /*
                This is a list of different possible routes and what components should
                be rendered for each one
             */


            /* for displaying audio app
            <div className="App-main">
                <AudioPlayer />
            </div>
            */

            <div>

            <Header/>

            <Switch>
                <Route exact path='/testing' component={AudioSearchBar}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/projects/:projectid' component={ProjectContainer}/>
                <Route exact path='/projects/:projectid/ch:chid' component={ChapterContainer}/>
                <Route exact path='/about' component={About}/>
            </Switch>

                <Footer/>

            </div>

        );
    }

}

export default App;

