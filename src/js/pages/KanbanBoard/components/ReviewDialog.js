import React, {Component} from 'react';
import styled from 'styled-components';


export default class ReviewDialog extends Component {

  render() {
    const {chapterNum, query, txt} = this.props;
    let icon = 'done';

    return (
      <Container>

        <Card>
          <Close onClick={this.props.closeModal}>
            <i style={styles.close} className="material-icons">close </i>
          </Close>

          <Info>
            <Icon>
              <i style={styles.icon} className="material-icons">{icon}</i>
            </Icon>

            <Message>
              {txt.get("goodJob")}
            </Message>

            <ExtraInfo>
              {txt.get("chapterCompleted")} {chapterNum}
            </ExtraInfo>

            <Instructions>
              {txt.get("reviewChapter")}
            </Instructions>
          </Info>

          <Action>
            <SkipButton onClick={this.props.nextChapter}> <i className="material-icons">arrow_forward </i> {txt.get("skipChapter")}  </SkipButton>
            <ChapterReviewButton onClick={()=> this.props.history.push(`/chapterReview${query}`)}> <i className="material-icons">done_all </i>
              {txt.get("goToChapterReview")}
            </ChapterReviewButton>
          </Action>

        </Card>

      </Container>
    );
  }
}

const styles = {

  close: {
    color: 'white',
    margin: '20px',
    height: '4vh',
    width: '2vw',
    fontSize: '40px',
  },

  icon: {
    color: 'white',
    height: '20vh',
    width: '10vw',
    fontSize: '10vw',

  },

};

const Container = styled.div`
  background: rgba(45,45,45,0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top:0;
  left:0;
  z-index: 100;
`;
Container.displayName = 'Container';


const Card = styled.div`
  background: linear-gradient(to top, #0076FF, #00C5FF);
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  min-height: 531px;
  min-width: 453.5px;
  border-radius: 25px;
  text-align: center;
  color: white;
  overflow: hidden;
`;
Card.displayName = 'Card';


const Close = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

Close.displayName = 'Close';

const Info= styled.div`
  align-self: center;
  width: 80%;
  flex: 1;
  padding: 3vw 3vw;
`;
Info.displayName = 'Info';

const Instructions = styled.p`
  font-size: 16px;
`;
Instructions.displayName = 'Instructions';

const Icon = styled.div`
  align-self: center;
`;
Icon.displayName= 'Icon';

const Message = styled.h2`
  font-size: 36px;
  margin-top: -15px;
`;
Message.displayName = 'Message';
const ExtraInfo = styled.p`
  margin-top: 2vw;
  font-size: 18px;
`;
ExtraInfo.displayName = 'ExtraInfo';

const Action = styled.div`
  background: white;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
Action.displayName = 'Action';

const ChapterReviewButton = styled.button`
  width: 35%;
  height: 6vh;
  min-height: 40px;
  border-radius: 25px;
  background: linear-gradient(to right, #0076FF, #00C5FF);
  align-self: center;
  border: none;
  text-decoration: underline;
  color: white;
  font-size: 16px;
  i {
    vertical-align: middle;
  };
  cursor: pointer;
  `;
ChapterReviewButton.displayName = 'ChapterReviewButton';


const SkipButton = styled(ChapterReviewButton)`
  background: none;
  color: #0076FF;
`;
SkipButton.displayName = 'SkipButton';
