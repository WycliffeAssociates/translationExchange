import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AudioPlayer from './js/shared/Audio_Player/audioPlayer';
import SearchBar from './js/shared/Search_Bar/search_bar';


class AudioSearchBar extends Component {

    render() {
        return (

            <div className="App">
                <SearchBar/>

                <div className="App-header">

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

export default AudioSearchBar;



