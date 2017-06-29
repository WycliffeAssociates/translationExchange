import React, { Component } from 'react';
import playlist from './playlist.json';
import sourcePlaylist from './playlist.json';
import Audio from 'react-audioplayer';
import './audioPlayer.css'

const Style = {
    //boxShadow: '3px 10px 10px #888888',
};

function buildSourceAudio(props) {


    for (let i = 0; i < props.length; i++) {
        if (props[i].hasSource) {

            var srcPlaylist = [{
                "name": "Source Audio",
                "src": props[i].sourceAudio
            }];

            return (
                <div>
                    <p className="buffer-between-takes" />
                    <Audio
                        width={700}
                        fullPlayer={false}
                        autoPlay={false}
                        style={Style}
                        playlist={srcPlaylist}
                    />
                </div>
            );
        }
    }

    return <h5>No source audio</h5>

}

function buildTakes(props) {

    var arrTakes = []; // holds each Audio tag
    var jsonPlaylist = playlist.playlist; // local array that holds objects from JSON file


    for(let i = 0; i < jsonPlaylist.length; i++) { // iterates through each object in JSON file
        var newPlaylist = [];
        newPlaylist[0] = jsonPlaylist[i];

        arrTakes[i] =
            (<div>

                <div className="buffer-between-takes" />

                <Audio
                    width={700}
                    height={150}
                    fullPlayer={true}
                    autoPlay={false}
                    style={Style}
                    playlist={newPlaylist}
                />


                <div className="buffer-between-takes" />


            </div>)
    }
    return <h5>{arrTakes}</h5>
}

class AudioPlayer extends Component {

    render() {
        return (
            <div>
                {buildSourceAudio(playlist.playlist)}
            {buildTakes()}
            </div>
        );
    }
}

export default AudioPlayer;