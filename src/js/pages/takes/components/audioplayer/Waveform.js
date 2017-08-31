import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';


class WaveForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      AudioObj:[],
      max: 0,
      nextAudio: false,
      audioPointer: 0,
      looping: false,
      finished: false
    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.duration = this.duration.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({AudioObj: nextProps.audioFile,
                   max: nextProps.audioFile.length
     });





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

if( this.props.looping && this.state.looping ){
     this.props.keepPlaying(true);

     }

}

  duration(e) {
    this.props.durationTime(e.wavesurfer.getDuration());
    this.loopPlaylist();


  if(this.state.finished){

      this.props.nextAudio(true);
  }

this.setState({finished:false, pos: 0});
    this.props.nextAudio(false);

  }

  finishedPlaying() {

    this.setState({pos: 0, looping: true, finished:true });


        if(this.state.audioPointer < this.state.max-1) {

              this.setState({audioPointer: this.state.audioPointer + 1});


           }else{

             this.setState({audioPointer: 0 , looping: false});
         }

    this.props.finishedPlaying(true);


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




export default WaveForm;
