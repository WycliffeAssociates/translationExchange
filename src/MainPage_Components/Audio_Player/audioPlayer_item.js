import React, { Component } from 'react';
import playlist from './playlist.json';
import Audio from 'react-audioplayer';



class AudioPlayerItem extends Component {





    render() {
        const Style = {
            boxShadow: '10px 10px 5px #888888',
            opacity: 0.8

        };




        return (
            <Audio
                width={600}
                height={200}
                color = "#00BFFF"
                fullPlayer = { true}
                playlist={playlist.playlist}
                style ={Style}

            />
        );
    }
}

export default AudioPlayerItem;