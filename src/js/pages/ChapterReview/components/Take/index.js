import React from 'react';
import styled from 'styled-components';
import Top from './Top';
import Audio from './Audio';
import VerseMarkers from './VerseMarkers';

export default class Take extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
      takePlaying: false,
    };

    this.trackPos = this.trackPos.bind(this);
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.dragPosition = this.dragPosition.bind(this);
  }

  trackPos(pos) {
    this.setState({pos: pos});
  }

  dragPosition(position) {
    if (position == 0) this.setState({pos: 0.0000001}); //work around for audio position not being reset to 0 on verse click
    else this.setState({pos: position});
  }

  finishedPlaying() {
    const {activeChunkIndex, selectedTakesLength} = this.props;
    if (activeChunkIndex < selectedTakesLength - 1 ) {
      this.props.updateActiveChunkIndex(activeChunkIndex, null, true);
    }
    else if (activeChunkIndex === selectedTakesLength -1) {
      this.setState({takePlaying: false});
      this.props.updateActiveChunkIndex(activeChunkIndex, 'done', false);
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPos === true) {
      this.setState({pos: 0});
      this.props.resetTake(false);
    }
  }

  render() {
    const {pos} = this.state;
    const {publishedTake, playing} = this.props.take;
    const {take, updateActiveChunkIndex, activeChunkIndex, active, resetPos,
      resetTake, selectedTakesLength, txt} = this.props;

    return (
      <Container active={active}>
        <Top takeNum={publishedTake.take_num} chunkNum={take.chunkNum} txt={txt} />
        <Audio audio={publishedTake.location} pos={pos}
          duration={publishedTake.duration}
          playing={playing} trackPos={this.trackPos}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex} finishedPlaying={this.finishedPlaying}
          resetPos={resetPos} selectedTakesLength={selectedTakesLength}
          resetTake={resetTake} />
        <VerseMarkers markers={publishedTake.markers} active={active} dragPosition={this.dragPosition} />

      </Container>
    );
  }

}

const Container = styled.div`
  width:  100%;
  background: ${props => props.active? 'linear-gradient(to top, #0076FF, #00C5FF);' :'#1B2633'};
  height: 0.22vh;
  min-height: 176px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  color: ${props => props.active? 'white' :'rgba(255,255,255,0.5)'};
`;
Container.displayName = 'Container';
