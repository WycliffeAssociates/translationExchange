import React from 'react';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';

export default class BottomButtons extends React.Component {

  constructor(props) {
    super(props);

    this.playButton = this.playButton.bind(this);
    this.convertToMinutes = this.convertToMinutes.bind(this);
  }

  convertToMinutes(seconds) {
    var final = '';
    var finalSeconds = 0;
    var minutes = 0;

    minutes = Math.floor(seconds/60);
    finalSeconds = seconds%60;
    if (finalSeconds<10) {
      finalSeconds = '0'+ finalSeconds;
    }

    final = minutes + ':'+ finalSeconds;

    return final;
  }

  playButton() {
    const playing = this.props.takePlaying;
    const play = <i className="material-icons">play_arrow</i>;
    const pause = <i className="material-icons">pause</i>;

    return (
      <PlayTakeContainer>

        <PlayTake  style={{display: playing? 'none': ''}} onClick= {() => this.props.playTakeFromCard()}>
          {play} {this.convertToMinutes(this.props.duration)}
        </PlayTake>


        <PlayTake style={{display: playing? '': 'none' }} onClick= {() => this.props.playTakeFromCard()}>
          {pause} {this.convertToMinutes(this.props.duration)}
        </PlayTake>

      </PlayTakeContainer>
    );
  }


  render() {
    const {comments} = this.props;
    const availableComments = comments.length;
    const { width } = this.props;
    return (
      <BottomButtonsContainer>
        <CommentButton onClick={() => this.props.expandComments()}>
          {comments.length > 0 ?
            <CommentBubble resize={width < 1800}>
              {availableComments}
            </CommentBubble>
            :
            ''
          }

          <i className="material-icons">mode_comment</i>

        </CommentButton>

        {this.playButton()}

      </BottomButtonsContainer>
    );
  }

}

const fadeInAnimation = keyframes`${fadeIn}`;

const CommentBubble = styled.div`
  position:absolute;
  border-radius:10vw;
  height: .9vw;
  width: .9vw;
  background-color: #E74C3C;
  left:4.3vw;
  bottom:${props=> props.resize ? '2.2vw': '1.6vw'};
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInAnimation} .5s ease-in;
  font-size: 12px;

`;
CommentBubble.displayName = 'CommentBubble';

const PlayTakeContainer = styled.div`

  flex: 1;
  border-top: solid 0.05vw #009CFF;
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;
PlayTakeContainer.displayName = 'PlayTakeContainer';


const BottomButtonsContainer = styled.div`
 display: flex;
 flex-direction: row;
 align-items: stretch;
`;
BottomButtonsContainer.displayName = 'BottomButtonsContainer';


const Button = styled.button`
  flex: 1;
  border: none;
  align-self: stretch;
  padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
`;
Button.displayName = 'Button';


const CommentButton = styled(Button)`
  position: relative;
  color: #009CFF;
  background: white;
  text-decoration: underline;
  cursor:pointer;
`;
CommentButton.displayName = 'CommentButton';


const PlayTake = styled(Button)`
  color: white;
  background: #009CFF;
  font-size: 1vw;
  display: flex;
  justify-content: space-evenly;
  align-items:center;
  cursor:pointer;
`;
PlayTake.displayName = 'PlayTake';
