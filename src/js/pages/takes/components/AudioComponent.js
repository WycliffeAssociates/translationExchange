import React, {Component} from 'react'
import Audio from 'translation-audio-player'
import * as ReactDOM from "react-dom";


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

    componentDidMount() {
        ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-play'));
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlist !== this.props.playlist) {
            ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-skip-to-next'));
            ReactDOM.findDOMNode(this.audioComponent).dispatchEvent(new Event('audio-play'));
        }
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
                <Audio
                    width={''}
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