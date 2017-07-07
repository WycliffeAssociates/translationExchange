import React, {Component} from 'react'
import Audio from 'translation-audio-player'
import axios from 'axios'

// requires a name (str) and src (str) when it is called
// name : name to display on take
// src  : url of file to be played in audio player

class AudioComponent extends Component {

    render() {

        var file = [];
        file[0] = {
            "name": this.props.name,
            "src": this.props.src
        }

        return(
            <Audio
                width={700}
                height={150}
                autoPlay={false}
                playlist={file}
                recordButton={() => {
                    alert('Hello');
                    // insert audio recording component here
                }}
            />
        );
    }
}

export default AudioComponent