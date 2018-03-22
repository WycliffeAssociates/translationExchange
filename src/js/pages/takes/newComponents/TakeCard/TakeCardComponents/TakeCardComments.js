import React from 'react';
import styled from 'styled-components';
import {ReactMic} from 'react-mic';
import CommentRow from './TakeCardCommentRow'
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

    return (
      <Comments>

        {
          this.props.has_comment?
            <CommentRow {...this.props} />
            :

            ''
        }
        <MoreOptions>

          <LoadMore>
            <i className="fa fa-chevron-circle-down" />
            {`${' '}Load More`}
          </LoadMore>

          {this.recordButton()}

        </MoreOptions>

        {
        // this.props.recording?
          // <ReactMic
          //   className = "sound-wave"
          //   record = {this.props.recording}
          //   onStop = {this.props.onStop}
          //   strokeColor="#009CFF"
          //   backgroundColor="transparent" />
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
  background: none;

`;

const Comments = styled.div`
padding-left: 1vw;
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
