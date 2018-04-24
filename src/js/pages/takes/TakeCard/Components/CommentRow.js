import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import PlayerTracker from '../../../../components/PlayerTracker';
import jdenticon from 'jdenticon';
import config from '../../../../../config/config';
import Draggable from 'react-draggable';
import {toast } from "react-notify-toast";

export default class TakeCardCommentRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id: null,
      x: 0,
      y: 0,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  componentDidMount() {
    const {comment} = this.props;
    jdenticon.update(`#CommentUser${comment.id}`, comment.owner_icon_hash);

  }

  play() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }

  handleDrag(e, ui) {
    const {x, y} = this.state;
    const { width} = this.props;
    console.log( x)

    if (x > width-9 ) {
      console.log('deleted')
    }

    this.setState({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  }




  render() {

    const {comment} = this.props;

    return (
      <Draggable onDrag={this.handleDrag} axis="x" bounds={{left :0, top:0, bottom: 0 }}>
        <CommentRow>


          <CommentPlayer >
            <PlayerTracker url={comment.location} />
          </CommentPlayer>

          <IdenticonContainer>
            <Identicon onClick={()=>toast(<Msg />)} id={`CommentUser${comment.id}`} data-jdenticon-hash={comment.owner_icon_hash} />
            <ReactPlayer url={`${config.streamingUrl}${comment.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />
          </IdenticonContainer>
        </CommentRow>
      </Draggable>
    );
  }

}

const Msg = ({ closeToast }) => (
<div>
  Lorem ipsum dolor
    <button>Retry</button>
    <button onClick={closeToast}>Close</button>
</div>
)


const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: solid 0.01vw lightgray;
  overflow: hidden;
  background: white;
  min-height: 40px;
`;

const CommentPlayer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const IdenticonContainer =styled.div`
  background-color: white;
  height: 1.5vw;
  width: 1.5vw;
  margin-right: 5%;

`;


const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;
