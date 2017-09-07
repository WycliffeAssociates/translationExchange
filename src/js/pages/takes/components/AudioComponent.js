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
      console.log('received props');
      console.log(this.props.multipleTakes);

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
        /*
         var file = [];
         file[0] = {
         "name": this.props.name,
         "src": this.props.src
         }
         */


        var file = this.props.playlist;
        const pause = this.state.pause;
        const markers = this.props.markers;
        const showMarkers = this.props.showMarkers;
        var autoPlay = this.props.autoPlay;



        return (
            <div>
                <AudioPlayer
                    play = {this.state.play}
                    width={this.props.width}
                    height={150}
                    autoPlay={true}
                    playlist={file}
                    recordButton={() => {
                        this.onClick()
                    }}
                    mic={this.props.mic}
                    loop={this.props.loop}
                    markers={markers}
                    showMarkers={showMarkers}
                    multipleTakes= {this.props.multipleTakes}


                    // ref to pause the audio
                    ref={audioComponent => {
                        this.audioComponent = audioComponent;
                    }}

                />


            </div>


        );
    }
}


export default AudioComponent
