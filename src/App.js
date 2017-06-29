import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from './MainPage_Components/Audio_Player/audioPlayer';
import SearchBar from './MainPage_Components/Search_Bar/search_bar';
import ReactStars from 'react-stars'
import { render } from 'react-dom'

var ReactDOM = require('react-dom');
var stars;
var starAmount;
var dbStar
// const ratingChanged = (newRating) => {
//     console.log(newRating)
// }
// render(<ReactStars count={3} onChange={ratingChanged} size={24} color2={'#ffd700'} half={false} />, document.getElementById('h1Test'));
// stars = new ReactStars();
//
// //starAmount = stars.clicked(this.setState)
// starCount = stars.getRate();//starCount is the amount of stars selected.
// console.log(starCount);
// //https://yarnpkg.com/en/package/react-stars-ie# ----- this is package info for ReactStars
//


class App extends Component {

    render() {
    return (

      <div className="App">
          <SearchBar/>

        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Translation Manager!</h2>

        </div >

          <div className="App-main">

              <AudioPlayer/>

          </div>

          <div className="App-footer">
              <p>Footer</p> <br></br>
          </div>

      </div>

    );
  }
}


Star();
function Star(){

    stars = new ReactStars();
    dbStar = 2; //TODO this will have to be changed to whatever we get from the database
    const ratingChanged = (newRating) => {//when the rating is changed it is logged here
        console.log(newRating)
    }

    render(<ReactStars count={3} onChange={ratingChanged} size={24} color2={'#ffd700'} half={false} value={dbStar}/>, document.getElementById('stars'));


    //if it does not work run this. Run npm first, only run yarn if npm does not work
    //npm install react-stars --save
    //yarn add react-stars-ie
    //https://www.npmjs.com/package/react-stars-ie
}


export default App;
