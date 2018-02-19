import React, { Component } from "react";
import Audio from "translation-audio-player";
import * as ReactDOM from "react-dom";
import AudioPlayer from './audioplayer/AudioPlayer';

let onClick;
// requires a name (str) and src (str) when it is called
// name : name to display on take
// src  : url of file to be played in audio player

class AudioComponent extends Component {


    constructor(props) {

        super(props);

        this.state = {
            RecordComponent: false,
            show: false,
            pause: false,
            play: false
        };

    }


    onClick = () => {                         // used when you click the microphone button in the player

        this.commentContainer.showModal();
    }

    componentWillReceiveProps(nextProps){


      if(nextProps.multipleTakes){        // pause the audio on receiving new audio files, this helps
        this.setState({play:false});       // to do not make laggy the audioplayer
      }

        this.setState({play:true});

    }
    componentDidMount() {
     this.setState({play:true});
    }

    componentDidUpdate(prevProps) {

    }
    render() {
        return (
            <div>
                <AudioPlayer
                    recordButton={() => {}}
                />
            </div>
        );
    }
}


export default AudioComponent
