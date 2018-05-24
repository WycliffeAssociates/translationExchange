import React from 'react';
import styled from 'styled-components';
import SelectedTake from './SelectedTake';
import ListView from './ListView';

export default class index extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, alternateTakes, index,resetPos,
      updateActiveChunkIndex, activeChunkIndex, resetTake}= this.props;
    const {chunk} = this.props.take.publishedTake;
    let active = activeChunkIndex === index? true: false;
    return (
      <Container>
        <SelectedTake take={take}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          active={active}
          resetPos={resetPos}
          resetTake={resetTake}  />

        <ListView chunkId ={chunk} alternateTakes={alternateTakes}
          index={index}
          active={active} />
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 67.5vh;
  width: 15vw;
  min-width: 276px;
  margin: 3px;
  justify-content: space-between;
`;
