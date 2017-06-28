
import React, { Component } from 'react';
import playlist from './playlist.json';
import Audio from 'react-audioplayer';
import './audioPlayer.css'

/* Early test cases
var songObj1 = {
    name: "take1",
    src: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
    img: "http://jacobhurleyart.files.wordpress.com/2014/01/calm-waveform.jpg"
}
var songObj2 = {
    name: "take2",
    src: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
    img: "http://jacobhurleyart.files.wordpress.com/2014/01/calm-waveform.jpg"
}
var songObj3 = {
    name: "take3",
    src: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
    img: "http://jacobhurleyart.files.wordpress.com/2014/01/calm-waveform.jpg"
}
*/

var somePlaylist= [];
var newPlaylist = [];
var arrTakes = [];

function buildTakes() {

    //somePlaylist = [songObj1, songObj2, songObj3];
    somePlaylist = playlist.playlist;
    const Style = {
        boxShadow: '10px 10px 5px #888888'
    };


    for(let i = 0; i < somePlaylist.length; i++) {
        newPlaylist = [];
        newPlaylist[0] = somePlaylist[i];

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
    return <h1>{arrTakes}</h1>
}

class AudioPlayer extends Component {

    // get number of chunks
    // display chunks in order

    // For 6/28...
    // import function to display multiple audio files in order from nathan->untitled5
    // ensure that everything runs!



    render() {


        return (
            /*<AudioPlayerItem/>*/
            <div>
            {buildTakes()}
            </div>
        );
    }
}

export default AudioPlayer;