import React from 'react';
import styled from 'styled-components';
import ControlButtons from './ControlButtons';

export default class index extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {activeChunkIndex, togglePlay,
      updateActiveChunkIndex, resetTake} = this.props;

    return (
      <Container>
        <ChapterInfo> Chapter 1  Review</ChapterInfo>

        <ControlButtons activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={resetTake}
        />

        <ExitButton> <i className="material-icons">close</i> Exit Review </ExitButton>

      </Container>
    );
  }

}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 7.5vh;
  background: #222B35;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;

`;

const ChapterInfo = styled.label`
  color: white;
  font-size: 18px;
`;

const ExitButton = styled.button`
  background: #39414A;
  width: 10vw;
  height: 80%;
  min-width: 150px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  border: none;
  padding: 5px;
  i{
    vertical-align: middle;
    font-size: 24px+2vw;
  }
`;
