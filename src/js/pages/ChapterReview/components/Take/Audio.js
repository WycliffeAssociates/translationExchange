import React from 'react';
import styled from 'styled-components';
import Waveform from '../../../takes/components/audioplayer/Waveform';
import config from 'config/config';

export default class Audio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
      takePlaying: false,
    };

    this.trackPos = this.trackPos.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
  }
  trackPos(pos) {
    this.setState({pos: pos});
  }

  finishedPlaying() {
    const {activeChunkIndex} = this.props;
    // this.setState({pos: 0});
    this.props.updateActiveChunkIndex(activeChunkIndex, null);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPos === true) {
      this.setState({pos: 0});
      this.props.resetTake(false);
    }
  }


  render() {
    const {pos} = this.state;
    const {audio, playing, duration} = this.props;
    return (
      <Container>
        <Waveform
          audioFile={config.streamingUrl+ audio}
          playing = {playing} durationTime={duration}
          trackPos = {this.trackPos}
          pos = {pos}
          finishedPlaying={this.finishedPlaying}
          options= {{ cursorWidth: 2, progressColor: 'white', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 45, waveColor: 'rgba(255,255,255,0.5)' }}
        />
      </Container>
    );
  }

}

const Container = styled.div`

`;
Container.displayName = 'Container';
