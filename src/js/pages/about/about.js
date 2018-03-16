/* eslint indent: [1, "tab", {SwitchCase: 1}] */
import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
require('wavesurfer.js');

class About extends Component {
	constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  render() {
    return (
      <div>
        <Wavesurfer
					audioFile="https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3"
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
					options={{ cursorWidth: 4, progressColor: '#3791D5', cursorColor: '#3791D5', barWidth: 0.2, hideScrollbar: true, normalize: true, height: 90, waveColor: 'blue' }}
        />
      </div>
      );
  }
}

export default About;
