import React, { Component } from 'react';
import Wavesurfer from 'react-wavesurfer';
import styled from 'styled-components';

class Wave extends Component {

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.play !== this.state.play) {
      this.setState({ play: nextProps.play });
    }
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
    this.props.onFinishPlaying();

  }

  render() {
    const { pos} = this.state;

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
      </Container>

    );
  }
}
Wavesurfer.displayName='Wavesurfer';

const Container = styled.div`
    display: flex;
    align-self: center;
    flex: 1 1 auto;
    width: 100%;
`;
Container.displayName = 'Container';

const WaveformContainer = styled.div`
    width: 100%;
  `;
WaveformContainer.displayName = 'WaveformContainer';

export default Wave;
