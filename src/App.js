import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AudioPlayer from './MainPage_Components/Audio_Player/audioPlayer';




import SearchBar from './MainPage_Components/Search_Bar/search_bar';


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

      </div>

    );
  }
}

export default App;
