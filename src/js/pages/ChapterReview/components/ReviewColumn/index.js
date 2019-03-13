import React from 'react';
import styled from 'styled-components';
import SelectedTake from './SelectedTake';
import ListView from './ListView';

export default class ReviewColumn extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {take, alternateTakes, index,resetPos, selectedTakesLength, togglePlayingTakes,
      updateActiveChunkIndex, activeChunkIndex, resetTake, saveComment,
      swapTake, undoSwapTake, tempTakes, setTake, txt, location, takesPlaying}= this.props;
    const {chunk} = this.props.take.publishedTake; //take is variable chosen when mapping array of selected takes
    let active = activeChunkIndex === index || (index == 0 && activeChunkIndex > (selectedTakesLength-1))? true: false;
    
    return (
      <Container>
        <SelectedTake take={take} index={index} togglePlayingTakes={togglePlayingTakes}
          updateActiveChunkIndex={updateActiveChunkIndex}
          activeChunkIndex={activeChunkIndex} resetTake={resetTake}
          active={active} selectedTakesLength={selectedTakesLength}
          resetPos={resetPos} txt={txt}
          resetTake={resetTake} takesPlaying={takesPlaying}  />

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
