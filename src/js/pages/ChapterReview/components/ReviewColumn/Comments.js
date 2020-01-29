import React from 'react';
import styled from 'styled-components';
import PlayerTracker from '../../../../components/PlayerTracker';
export default class Comments extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {active, comments, txt} = this.props;
    return (
      <CommentContainer active={active}>
        <p> {txt.get("comments")} </p>
        {
          comments.length>0?
            comments.map((comment) => {
              return (
                <div style={{marginTop: '-1.5vh'}} key={comment.id}>
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
  height: 11vh;
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
CommentContainer.displayName='CommentContainer';
