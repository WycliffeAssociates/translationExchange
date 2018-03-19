import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import {ReactMic} from 'react-mic';

export default class TakeCardComments extends React.Component {

  constructor(props) {
    super(props);

    this.recordButton = this.recordButton.bind(this);
  }


  recordButton() {
    const recording = this.props.recording;
    const microphone = <i className = "fa fa-microphone" />;
    const stop = <i className = "fa fa-stop" />;

    return (
      <div style={{backgroundColor: '#E74C3C', width: '4vw'}}>

        <RecordComment style={{ display: recording? '': 'none'}} onClick = {this.props.recordComment}>
          {stop}
        </RecordComment>

        <RecordComment style={{ display: recording? 'none': ''}} onClick = {this.props.recordComment}>
          {microphone}
        </RecordComment>

      </div>

    );
  }


  render() {

    let playPauseIcon = 'fas fa-play fa-fw';

    return (
      <Comments>
        <CommentRow>

          <CommentIcon id="comment" data-jdenticon-value={'imthemaster'} />
          <CommentPlayer >
            <PlayComment onClick ={this.props.playComment}> <i className={playPauseIcon} /> </PlayComment>
            <ReactPlayer url={this.props.blob} playing ={this.props.playingComment} style={{display: 'none'}} />
          </CommentPlayer>

          <RowButton> <i className = "fa fa-trash" /> </RowButton>

        </CommentRow>

        <MoreOptions>

          <LoadMore>
            <i className="fa fa-chevron-circle-down" />
            {`${' '}Load More`}
          </LoadMore>

          {this.recordButton()}

        </MoreOptions>

        {
        // this.props.recording?
          <ReactMic
            className = "sound-wave"
            record = {this.props.recording}
            onStop = {this.props.onStop}
            strokeColor="#009CFF"
            backgroundColor="transparent" />
        //  : ''
        }

      </Comments>
    );
  }

}


const Button = styled.button`
  font-size: 1.75vw;
  flex: 1;
  border: none;
  align-self: stretch;
  padding: 0.75vw;
  border-top: solid 0.05vw #009CFF;
  text-align:center;
`;

const PlayComment = styled(Button)`
  font-size: 1vw;
  flex: 0;
  border-top: none;
  padding: 0.4vw;
`;


const Comments = styled.div`
padding-left: 1vw;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.01vw lightgray;
  overflow: hidden;
`;

const CommentPlayer = styled.div`
  display: flex;
  alignItems: flex-start;
  flex: 1;
`;
const RowButton = styled(Button)`
  flex:0;
  padding: 0.4vw;
  border-top: none;
  font-size: 1vw;
`;

const MoreOptions = styled.div`
  margin-top: 0.1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;

const LoadMore = styled.label`
  font-size: 1vw;
  text-decoration: underline;
  color: #009CFF;
  font-weight: bold;
`;

const RecordComment = styled(Button)`
  background: none;
  color: white;
  flex: 0;
  font-size: 1.4vw;
  padding: 1vw 1.5vw;
  align-self: flex-end;
  border-top: none;

`;

const CommentIcon = styled.svg`
  height: 2vw;
  width: 2w;
  margin-top: 0;
`;
