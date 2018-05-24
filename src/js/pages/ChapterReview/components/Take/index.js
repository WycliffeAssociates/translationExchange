import React from 'react';
import styled from 'styled-components';
import Top from './Top';
import Audio from './Audio';
import VerseMarkers from './VerseMarkers';

export default class index extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {publishedTake, playing} = this.props.take;
    const {take, updateActiveChunkIndex, activeChunkIndex, active, resetPos
      ,resetTake} = this.props;

    return (
      <Container active={active}>
        <Top takeNum={publishedTake.take_num} chunkNum={take.chunkNum} />
        <Audio audio={publishedTake.location}
          duration={publishedTake.duration}
          playing={playing}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          resetPos={resetPos}
          resetTake={resetTake} />
        <VerseMarkers markers={publishedTake.markers} active={active} />

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
