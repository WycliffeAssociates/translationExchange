import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import { connect } from "react-redux";
import {updateAudioPlayer} from '../../../../actions';


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



loopPlaylist(){



}

  duration(e) {
    this.props.durationTime(e.wavesurfer.getDuration());
    this.loopPlaylist();


      this.props.updateAudioPlayer({props: 'play', value: true});




this.setState({finished:false, pos: 0});


  }



  finishedPlaying() {

    this.setState({pos: 0, looping: true, finished:true });

    this.props.finishedPlaying(true);

    this.props.updateAudioPlayer({props: 'play', value: false});

     if(this.props.playlist){
         this.props.updateAudioPlayer({props: 'play', value: true});

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
          playing={this.props.playAudio}
          options={{ cursorWidth: 4, progressColor: '#3791D5', cursorColor: '#3791D5', barWidth: 0.2, hideScrollbar: true, normalize: true, height: 90, waveColor: '#FFF' }}
          onReady={this.duration}
          onFinish={this.finishedPlaying}
        />

    );
  }
}




const mapToStateProps = state => {

const{ readyToPlay, playFromCardButton } = state.audioPlayer;

return{readyToPlay, playFromCardButton };

}



export default connect(mapToStateProps, {updateAudioPlayer})(WaveForm);
