import React from 'react';
import styled from 'styled-components';
import ControlButtons from './ControlButtons';
import QueryString from 'query-string';

export default class BottomBar extends React.Component {

  constructor(props) {
    super(props);
    this.exit = this.exit.bind(this);
  }


  exit() {
    const {history} = this.props;
    history.push(`kanban${this.props.location.search}`);
    
    this.props.updateActiveChunkIndex(0, 0, false);
    this.props.clearAlternateTakes();
    this.props.clearSelectedTakes();
  }


  render() {
    const {activeChunkIndex, togglePlay, stopPlaying,txt, togglePlayingTakes,
      updateActiveChunkIndex, resetTake, selectedTakesLength,
      takesPlaying} = this.props;
    var query = QueryString.parse(this.props.location.search);
    var chapterNum = query.chapterNum;
    return (
      <Container>
        <ChapterInfo> {txt.get("chapter")} {chapterNum}  {txt.get("review")} </ChapterInfo>

        <ControlButtons activeChunkIndex={activeChunkIndex}
          togglePlay={togglePlay}
          updateActiveChunkIndex={updateActiveChunkIndex}
          resetTake={resetTake} stopPlaying={stopPlaying}
          selectedTakesLength={selectedTakesLength}
          togglePlayingTakes = {togglePlayingTakes}
          takesPlaying={takesPlaying}
        />

        <ButtonContainer>
          
          <NextChapterButton onClick={this.props.nextChapter}> <i className="material-icons">arrow_forward</i> {txt.get("goToNextChapter")} </NextChapterButton>

          <ExitButton onClick={this.exit}> <i className="material-icons">close</i> {txt.get("exitReview")} </ExitButton>
        
        </ButtonContainer>

        

      </Container>
    );
  }

}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 10vh;
  background: #222B35;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
`;
Container.displayName = 'Container';

const ChapterInfo = styled.label`
  color: white;
  font-size: 18px;
`;
ChapterInfo.displayName = 'ChapterInfo';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExitButton = styled.button`
  background: #39414A;
  width: 10vw;
  height: 6vh;
  min-width: 150px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  border: none;
  padding: 0.75vw;
  i{
    vertical-align: middle;
    font-size: 24px+2vw;
  }
  cursor: pointer;
`;
ExitButton.displayName = 'ExitButton';

const NextChapterButton = styled.button`
  background: linear-gradient(to right, #0076FF, #00C5FF  );
  width: 10vw;
  height: 6vh;
  min-width: 150px;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  border: none;
  padding: 0.75vw;
  cursor: pointer;
  margin-right: 2vh;
  i{
    vertical-align: middle;
    font-size: 24px+2vw;
  }
`;
NextChapterButton.displayName = 'NextChapterButton';
