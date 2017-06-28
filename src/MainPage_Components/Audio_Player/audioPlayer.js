import React, { Component } from 'react';
import playlist from './playlist.json';
import sourcePlaylist from './playlist.json';
import Audio from 'react-audioplayer';
import './audioPlayer.css'

const Style = {
    //boxShadow: '3px 10px 10px #888888',
};

function buildSourceAudio(props) {

     if(props[0].hasSource) {

         var srcPlaylist = [{
             "name": "Source Audio",
             "src": props[0].sourceAudio // index is required to access JSON data
         }];

         return (
             <div>
                 <Audio
                     width={700}
                     fullPlayer={false}
                     autoPlay={false}
                     style={Style}
                     playlist={srcPlaylist}

                 />
                 <p className="buffer-between-src"/>
             </div>);
     }

     else {
         return(
             <div>
                 <p className="buffer-between-src"/>
                 <h5>No Source Audio</h5>
                 <p className="buffer-between-src"/>
             </div>
         );
     }

}

function buildTakes() {

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

                {buildSourceAudio(newPlaylist)}

                <div className="buffer-between-takes" />


            </div>)
    }
    return <h5>{arrTakes}</h5>
}

class AudioPlayer extends Component {

    render() {
        return (
            <div>
            {buildTakes()}
            </div>
        );
    }
}

export default AudioPlayer;