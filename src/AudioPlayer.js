import React, { Component } from 'react';

class AudioPlayer extends Component {
    render () {
        return (
            <div className="audioPlayer">
                I am playing audio from {this.props.audioSource}
            </div>
        );
    }
}

export default AudioPlayer;
