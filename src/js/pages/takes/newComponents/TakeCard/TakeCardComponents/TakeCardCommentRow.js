import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import PlayerTracker from '../../../../../components/PlayerTracker';


export default class TakeCardCommentRow extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <CommentRow>

        <CommentIcon id="comment" data-jdenticon-value={'imthemaster'} />

        <CommentPlayer >
          <PlayerTracker playing ={this.props.playingComment} duration={this.props.take.duration} />
          <ReactPlayer url={this.props.blob} playing ={this.props.playingComment} style={{display: 'none'}} />
        </CommentPlayer>

        <RowButton> <i className = "fa fa-trash" /> </RowButton>

      </CommentRow>
    );
  }

}


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
  align-items: center;
  flex: 1;
`;


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

const RowButton = styled(Button)`
  flex:0;
  padding: 0.4vw;
  border-top: none;
  font-size: 1vw;
`;

const CommentIcon = styled.svg`
  height: 2vw;
  width: 2w;
  margin-top: 0;
`;
