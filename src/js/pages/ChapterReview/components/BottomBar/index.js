import React from 'react';
import styled from 'styled-components';
import ControlButtons from './ControlButtons';
import QueryString from 'query-string';

export default class index extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillUnMount() {
    this.props.clearAlternateTakes();
  }


  render() {
    const {activeChunkIndex, togglePlay, stopPlaying,txt,
      updateActiveChunkIndex, resetTake, history, selectedTakesLength} = this.props;
    var query = QueryString.parse(this.props.location.search);
    var chapterNum = query.chapterNum;
    return (
      <Container>
        <ChapterInfo> {txt.chapter} {chapterNum}  {txt.review} </ChapterInfo>

        <ControlButtons activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={resetTake} stopPlaying={stopPlaying}
          selectedTakesLength={selectedTakesLength}
        />

        <ExitButton onClick={()=> history.push(`kanban${this.props.location.search}`)}> <i className="material-icons">close</i> {txt.exitReview} </ExitButton>

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
  cursor: pointer;
`;
