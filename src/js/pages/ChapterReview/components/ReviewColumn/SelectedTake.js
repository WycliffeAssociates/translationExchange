import React from 'react';
import styled from 'styled-components';
import Take from '../Take';
import Comments from './Comments';
export default class SelectedTake extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, updateActiveChunkIndex, resetPos,txt,
      activeChunkIndex, active, resetTake, selectedTakesLength} = this.props;
    return (
      <Container>
        <Take take={take} txt={txt}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          active={active} selectedTakesLength={selectedTakesLength}
          resetPos={resetPos}
          resetTake={resetTake} />

        <Comments active={active} txt={txt} comments= {take.publishedTake.comments} />

      </Container>
    );
  }

}

const Container = styled.div`

`;
