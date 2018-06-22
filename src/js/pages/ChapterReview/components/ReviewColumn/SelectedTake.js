import React from 'react';
import styled from 'styled-components';
import Take from '../Take';
import Comments from './Comments';
export default class SelectedTake extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  handleClick() {
    const {updateActiveChunkIndex, activeChunkIndex,
      index, resetTake, takesPlaying} = this.props;
    updateActiveChunkIndex(activeChunkIndex, index, takesPlaying);
    resetTake(true);
  }

  isActive() {
    const {take, updateActiveChunkIndex, resetPos,txt,
      activeChunkIndex, active, resetTake, selectedTakesLength} = this.props;
    if (active) { //return the selected take without the onClick handler
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

    else {
      return (
        <Container onClick={this.handleClick}>
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

  render() {
    let selectedTake = this.isActive();

    return (
      selectedTake
    );
  }

}

const Container = styled.div`
`;
Container.displayName = 'Container';
