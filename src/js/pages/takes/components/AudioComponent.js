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
        const src = file[0].src;
        const pause = this.state.pause;
        const markers = this.props.markers;
        const showMarkers = this.props.showMarkers;
        var autoPlay = this.props.autoPlay;

        return (
            <div>
                <Audio
                    width={''}
                    height={''}
                    autoPlay={true}
                    playlist={file}
                    recordButton={() => {
                        this.onClick()
                    }}
                    mic={this.props.mic}
                    src ={src}
                    loop={this.props.loop}
                    //src="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3"
                    markers={markers}
                    showMarkers={showMarkers}
                    markersButton={true}

                    // ref to pause the audio
                    ref={audioComponent => {
                        this.audioComponent = audioComponent;
                    }}
                    style={{
                        boxShadow: '1px 2px 6px rgba(0, 0, 0, 0.2)',
                        width: '1200px',
                        height: '150px',
                        backgroundColor:'black'
                    }}

                />


            </div>


        );
    }
}


export default AudioComponent