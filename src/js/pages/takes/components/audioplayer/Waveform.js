import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';



class WaveForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: props.pos? props.pos : 0,
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
    this.props.trackPos(e.originalArgs[0]);
  }

  render() {
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
