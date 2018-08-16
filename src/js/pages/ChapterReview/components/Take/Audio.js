import React from 'react';
import styled from 'styled-components';
import Waveform from '../../../takes/components/audioplayer/Waveform';
import config from '../../../../../config/config';

export default class Audio extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {audio, playing, duration, trackPos, finishedPlaying, pos} = this.props;
    return (
      <Container>
        <Waveform
          audioFile={config.streamingUrl+ audio}
          playing = {playing} durationTime={duration}
          trackPos = {trackPos}
          pos = {pos}
          finishedPlaying={finishedPlaying}
          options= {{ cursorWidth: 2, progressColor: 'white', cursorColor: '#E74C3C', barWidth: 1, hideScrollbar: true, normalize: true, height: 45, waveColor: 'rgba(255,255,255,0.5)' }}
        />
      </Container>
    );
  }

}

const Container = styled.div`

`;
Container.displayName = 'Container';
Waveform.displayName = 'Waveform';
