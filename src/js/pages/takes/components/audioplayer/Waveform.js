import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {playAudio, stopAudio, updateTime} from '../../../../actions';



class WaveForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0,
      audioFile: '',
      pointer: 1,

    };

    this.handlePosChange = this.handlePosChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pos: nextProps.pos});
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
    });

  }


  render() {
    //let position = this.state.pos;

    if (this.props.markerClicked) {

    //  position = this.props.markerPosition;
    }

    return (

      <Wavesurfer
        audioFile ={this.props.audioFile}
        pos={this.state.pos}
        onPosChange={this.handlePosChange}
        playing={this.props.playing}
        options={this.props.options}
        onReady={this.duration}
        onFinish={this.props.finishedPlaying}
      />

    );
  }
}


export default WaveForm;
