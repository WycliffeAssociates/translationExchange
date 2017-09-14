import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {playAudio, stopAudio, finishedPlaying} from '../../../../actions';



class WaveForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      max: 0,
      nextAudio: false,
      looping: false,
      finished: false
    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.duration = this.duration.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
  }



  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
      nextAudio:false,
    });


      this.props.updateTime(this.state.pos);
     this.props.resetMarkerClicked(false);

  }



  finishedPlaying(check){
  debugger;
  this.setState({finishedPlaying: check,
                  play: false,
                  audioFile:  this.props.playlist[0].src,
                  audioName:  this.props.playlist[0].name
                               });

           let i = this.state.pointer;


     if(this.state.pointer === this.props.playlist.length){
      this.setState({play: false, pointer: 1, markers: this.props.playlist[0].markers});

     }

        if(this.props.playlist.length > 1 && i <  this.props.playlist.length  ){

          this.setState({
           play:      true,
           audioFile:  this.props.playlist[i].src,
           audioName:  this.props.playlist[i].name,
           markers: this.props.playlist[i].markers,
           pointer : this.state.pointer + 1

           });






         }





  }

  duration(e) {
    this.props.durationTime(e.wavesurfer.getDuration());
    


    //  this.props.updateAudioPlayer({props: 'play', value: true});




this.setState({finished:false, pos: 0});


  }



  finishedPlaying() {

    this.setState({pos: 0});

    if(!this.props.multipleTakes){
           this.props.stopAudio();
       }


  }



  render() {
    let position = this.state.pos;


    if (this.props.markerClicked){

      position = this.props.markerPosition;
      }





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
const{ multipleTakes } = state.updatePlaylist;
return{ play, multipleTakes };

}

const mapDispatchToProps = dispatch => {

  return bindActionCreators({
          finishedPlaying: finishedPlaying,
          playAudio:playAudio,
          stopAudio:stopAudio
}, dispatch);

};



export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
