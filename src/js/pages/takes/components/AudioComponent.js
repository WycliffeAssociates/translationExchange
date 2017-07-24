import React, {Component} from 'react'
import Audio from 'translation-audio-player'
import CommentContainer from './comments/CommentContainer'
import * as ReactDOM from "react-dom";
import marker from  './Markers.json'
import onClick from './comments/CommentContainer'
import MicButton from "./comments/MicButton";



// requires a name (str) and src (str) when it is called
// name : name to display on take
// src  : url of file to be played in audio player

class AudioComponent extends Component {

    constructor(props){

        super(props);

        this.state = {
            RecordComponent: false,
            show : false,
            pause: false
        };

    }


    onClick = () => {                         // used when you click the microphone button in the player

        this.commentContainer.showModal();
        ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-pause'));
    }

    componentWillUnmount() {
        ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-pause'));
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

        return(
            <div>
                <Audio
                    width={this.props.width}
                    height={150}
                    autoPlay={false}
                    playlist={file}
                    recordButton={() => {
                        this.onClick()

                    }}
                    mic={this.props.mic}
                    markers={markers}
                    showMarkers={true}

                    // ref to pause the audio
                    ref={audioComponent => { this.audioComponent = audioComponent; }}

                />

                {/*used ref to call a method in child class and instance*/}

                <MicButton
                    updateTakeInState={this.props.updateTakeInState}
                    ref={instance => (this.commentContainer = instance)}
                    take={this.props.take}
                />




            </div>


        );
    }
}






export default AudioComponent