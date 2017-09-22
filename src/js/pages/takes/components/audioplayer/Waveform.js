import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {playAudio, stopAudio, updateTime} from '../../../../actions';



class WaveForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      audioFile: '',
      pointer: 1

    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.duration = this.duration.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
  }



  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });


  //  this.props.updateTime(this.state.pos);
     this.props.resetMarkerClicked(false);

  }



  duration(e) {
    this.props.durationTime(e.wavesurfer.getDuration());

    this.setState({ pos: 0});
    if(!this.props.playlistMode){
      this.props.playAudio();
    }

  }



  finishedPlaying() {

    this.setState({pos: 0});
    this.props.stopAudio();

    if(this.props.playlistMode){
            this.props.finishedPlaying();  // function called in audioPlayer.js
       }



  }



  render() {
    let position = this.state.pos;


    if (this.props.markerClicked){

      position = this.props.markerPosition;
      }

   console.log(this.props.audioFile);



    return (

        <Wavesurfer
          audioFile ={this.props.audioFile}
          //audioFile="http://172.19.145.91/media/dump/1501176679.73d99dfff8-5117-4635-b734-65140995db67/mrk/07/chapter.wav"
          //audioFile="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3"
          pos={position}
          onPosChange={this.handlePosChange}
          playing={this.props.play}
          options={{ cursorWidth: 4, progressColor: '#3791D5', cursorColor: '#3791D5', barWidth: 0.2, hideScrollbar: true, normalize: true, height: 90, waveColor: '#FFF' }}
          onReady={this.duration}
          onFinish={this.finishedPlaying}
        />

    );
  }
}




const mapStateToProps = state => {

const{ play } = state.setAudioPlayerState;
const{ playlistMode, playlist } = state.updatePlaylist;
return{ play, playlistMode, playlist };

}

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
          playAudio,
          stopAudio,
          updateTime



}, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
