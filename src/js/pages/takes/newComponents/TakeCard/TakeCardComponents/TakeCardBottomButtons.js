import React from 'react';
import styled from 'styled-components';

export default class TakeCardBottomButtons extends React.Component {

  constructor(props) {
    super(props);

    this.playButton = this.playButton.bind(this);
  }


  playButton() {
    const playing = this.props.takePlaying;
    const play = <i className = "fa fa-play" />;
    const pause = <i className = "fa fa-pause" />;

    return (
      <PlayTakeContainer>

        <PlayTake  style={{display: playing? 'none': ''}} onClick= {() => this.props.playTakeFromCard()}>
          {play} {this.props.take.duration}s
        </PlayTake>


        <PlayTake style={{display: playing? '': 'none' }} onClick= {() => this.props.playTakeFromCard()}>
          {pause} {this.props.take.duration}s
        </PlayTake>


      </PlayTakeContainer>
    );
  }


  render() {

    return (
      <BottomButtons>
        <CommentButton onClick={() => this.props.expandComments()}>
          <span className="fa-layers fa-fw">
            <i className="fas fa-comment" />
            <span className="fa-layers-counter" style={{fontSize: '2.1vw', padding: '0.5vw'}}> 2 </span>
          </span>
        </CommentButton>

        {this.playButton()}

      </BottomButtons>
    );
  }

}

const PlayTakeContainer = styled.div`

  flex: 1;
  border-top: solid 0.05vw #009CFF;
  display: flex;
  flex-direction: row;
  align-items: stretch;

`;
const BottomButtons = styled.div`
 display: flex;
 flex-direction: row;
 align-items: stretch;
`;

const Button = styled.button`
  font-size: 1.75vw;
  flex: 1;
  border: none;
  align-self: stretch;
  padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
`;

const CommentButton = styled(Button)`
  color: #009CFF;
  background: white;
  text-decoration: underline;
`;

const PlayTake = styled(Button)`
  color: white;
  background: #009CFF;
  font-size: 1.2vw;
`;
