import React from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';
import config from 'config/config';
export default class Comments extends React.Component {

  constructor(props) {
    super(props);

    this.concatComments = this.concatComments.bind(this);
  }

  concatComments(comments) {
    var array=[];
    // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // let audio= audioCtx.createBuffer();
    comments.forEach((comment) => {
      array.push(config.streamingUrl+comment.location);
    });
    return array;
  }


  render() {
    const {active, comments} = this.props;
    return (
      <CommentContainer active={active}>
        <p> Comments </p>
        {
          comments.length>0?
            comments.map((comment) => {
              return (
                <div style={{marginTop: '-1.5vh'}}>
                  <PlayerTracker ChapterReview={true} playHead={'2.5vw'} url={comment.location} />
                </div>
              );
            })

            :
            <i className="material-icons">not_interested</i>
        }
      </CommentContainer>
    );
  }

}

const CommentContainer = styled.div`
  height: 10vh;
  width: 100%;
  background: ${props => props.active? '#0D4E78' :'#1B2633'};
  border-radius: 5px;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    color: white;
  }
`;
