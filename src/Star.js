/**
 * Created by DennisMarchuk on 6/29/2017.
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

const ratingChanged = (newRating) => {//when the rating is changed it is logged here
    console.log(newRating)
}

export class Star extends Component{

    render(){
        return (
            <ReactStars count={3} onChange={ratingChanged} size={24} color2={'#ffd700'} half={false} value={this.props.dbStar}/>
        );
    }

    //npm install react-stars --save
    //if it does not work run this. Run npm first, only run yarn if npm does not work
    //yarn add react-stars-ie
    //https://www.npmjs.com/package/react-stars-ie
}

export default Star