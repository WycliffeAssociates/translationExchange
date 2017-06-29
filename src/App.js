/*
    An example top-level app that handles basic layout and routing using React Router
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ChapterContainer from "./js/pages/chapter/ChapterContainer";
import ProjectsListContainer from "./js/pages/projects/ProjectsListContainer";
import ProjectContainer from "./js/pages/projects/ProjectContainer";
import './App.css';
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import Header from './js/layout/header'
import AudioSearchBar from './AudioSearchBar'
import Home from './js/pages/home'
import About from './js/pages/about'

var stars;
var starAmount;
var dbStar
var ReactDOM = require('react-dom');


class App extends Component {

    Star(){

        stars = new ReactStars();
        dbStar = 2; //TODO this will have to be changed to whatever we get from the database
        const ratingChanged = (newRating) => {//when the rating is changed it is logged here
            console.log(newRating)

        }
        render(<ReactStars count={3} onChange={ratingChanged} size={24} color2={'#ffd700'} half={false} value={dbStar}/>, document.getElementById('stars'));


        //npm install react-stars --save
        //if it does not work run this. Run npm first, only run yarn if npm does not work
        //yarn add react-stars-ie
        //https://www.npmjs.com/package/react-stars-ie
    }


    render() {
        return (
            /*
                This is a list of different possible routes and what components should
                be rendered for each one
             */
            <div>
            <Header/>
            {this.Star()}
            <Switch>
                <Route exact path='/testing' component={AudioSearchBar}/>
                <Route exact path='/home' component={Home}/>
                <Route exact path='/projects' component={ProjectsListContainer}/>
                <Route exact path='/projects/:projectid' component={ProjectContainer}/>
                <Route exact path='/projects/:projectid/ch:chid' component={ChapterContainer}/>
                <Route exact path='/about' component={About}/>
            </Switch>
            </div>
        );
    }
    

}

export default App;

