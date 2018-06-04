import React from 'react';
import styled from 'styled-components';
import SelectedTake from './SelectedTake';
import ListView from './ListView';

export default class ReviewColumn extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, alternateTakes, index,resetPos, selectedTakesLength,
      updateActiveChunkIndex, activeChunkIndex, resetTake, saveComment,
      swapTake, undoSwapTake, tempTakes, setTake, txt, location}= this.props;
    const {chunk} = this.props.take.publishedTake; //take is variable chosen when mapping array of selected takes
    let active = activeChunkIndex === index? true: false;
    return (
      <Container>
        <SelectedTake take={take}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex}
          active={active} selectedTakesLength={selectedTakesLength}
          resetPos={resetPos} txt={txt}
          resetTake={resetTake}  />

        <ListView chunkId ={chunk} alternateTakes={alternateTakes}
          index={index} active={active} txt={txt}
          swapTake={swapTake} undoSwapTake= {undoSwapTake}
          tempTakes={tempTakes} saveComment={saveComment}
          take={take} setTake={setTake} location={location} />
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
Container.displayName='Container';
