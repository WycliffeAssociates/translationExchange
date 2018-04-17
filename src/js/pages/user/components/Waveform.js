import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import PlayPauseBtn from './PlayPauseBtn';
import styled,{keyframes} from 'styled-components';
import {fadeIn} from "react-animations";

class Waveform extends Component {

  constructor(props) {
    super(props);

    this.state = {
      play: false,
      pos: 0,
    };

    this.handlePosChange = this.handlePosChange.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0],
    });
  }

  toggleButton() {
    this.setState({ play: !this.state.play });
  }

  finishedPlaying() {

    this.setState({ play: false, pos: 0 });

  }

  render() {
    const { pos, play} = this.state;

    return (
      <Container>
        <WaveformContainer>

          <Wavesurfer
            audioFile={this.props.audioFile}
            pos={pos}
            onPosChange={this.handlePosChange}
            playing={this.state.play}
            options={{ cursorWidth: 2, progressColor: '#eff0f2', cursorColor: 'transparent', barWidth: 4, hideScrollbar: true, normalize: true, height: 60, waveColor: '#3791D5' }}
            onReady={this.duration}
            onFinish={this.finishedPlaying}
          />

        </WaveformContainer>
        <PlayPauseBtn startPlaying= {()=>this.toggleButton()} playing={play} />

      </Container>

    );
  }
}

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
    display: flex;
    align-self: center;
    flex: 1 1 auto;
    width: 100%;
    padding-top: 110px;
    margin-right: 2%;
    flex-direction:column;
    animation: ${fadeInAnimation} .3s ease-in;
`;

const WaveformContainer = styled.div`
    width: 100%;
    margin-top:10px;
  `;

export default Waveform;
