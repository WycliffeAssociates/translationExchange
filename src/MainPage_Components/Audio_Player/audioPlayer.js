
import React, { Component } from 'react';
import playlist from './playlist.json';
import Audio from 'react-audioplayer';
import AudioPlayerItem from './audioPlayer_item';


class AudioPlayer extends Component {





    render() {
        const Style = {
            boxShadow: '10px 10px 5px #888888',
            opacity: 0.8

        };




        return (
            <AudioPlayerItem/>
        );
    }
}

export default AudioPlayer;