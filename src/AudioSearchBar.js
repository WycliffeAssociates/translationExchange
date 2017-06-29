import React, { Component } from 'react';
import './App.css';
import AudioPlayer from './js/audio player/Audio_Player/audioPlayer';

class AudioSearchBar extends Component {

    render() {
        return (

            <div className="App">

                <div className="App-header">
                    <h2>Welcome to Translation Manager!</h2>
                </div >

                <div className="App-main">
                    <AudioPlayer/>
                </div>

                {/*<div className="App-footer">*/}
                    {/*<p>Footer</p> <br/>*/}
                {/*</div>*/}

            </div>

        );
    }
}

export default AudioSearchBar;



