import React from 'react';
import styled from 'styled-components';
import Take from '../Take';
import Comments from './Comments';
export default class SelectedTake extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, updateActiveChunkIndex, resetPos,
      activeChunkIndex, active, resetTake, selectedTakesLength} = this.props;
    return (
      <Container>
        <Take take={take}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          active={active} selectedTakesLength={selectedTakesLength}
          resetPos={resetPos}
          resetTake={resetTake} />

        <Comments active={active} comments= {take.publishedTake.comments} />

      </Container>
    );
  }

}

const Container = styled.div`

`;
