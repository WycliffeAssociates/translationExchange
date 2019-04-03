import React from 'react';
import styled from 'styled-components';
import '../../css/notification.css';
import ReactPlayer from 'react-player';
import PlayerTracker from './PlayerTracker';
import DeleteCommentToast from './DeleteCommentToast';
import jdenticon from 'jdenticon';
import config from '../../config/config';
import Draggable from 'react-draggable';
import { toast} from 'react-toastify';



export default class CommentRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id: null,
      x: 0,
      counter: 0,
      deleteComment: true,
      controlledPosition: {
        x: 0, y: 0,
      },
    };
    this.playOwner = this.playOwner.bind(this);
    this.ended = this.ended.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    const {comment} = this.props;
    jdenticon.update(`#CommentUser${comment.id}`, comment.owner_icon_hash? comment.owner_icon_hash: 'null user');

  }

  playOwner() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }

  handleDrag(e, ui) {
    const {x, counter} = this.state;  // counter is used to display one notification of deleting
    const {width, txt} = this.props;
    if (x > width-30 && counter===0 ) {
      this.setState({counter: 1});
      toast(<DeleteCommentToast txt={txt} redo={()=> this.setState({deleteComment: false})} />, {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'page-bar',
        onClose: () => this.deleteComment(),
        autoClose: 5000,
      });
    }

    this.setState({
      x: x + ui.deltaX,
      controlledPosition: {x: x + ui.deltaX, y: 0},
    });
  }

  deleteComment() {
    const {deleteComment} = this.state;
    const {id, type, chapterId} = this.props;

    if (deleteComment) {
      this.props.deleteComment(id, type, chapterId);
    }
    else {
      this.adjustXPos();
      this.setState({counter: 0, x: 0, deleteComment: true});
    }

  }

  adjustXPos(e) {
    this.setState({controlledPosition: {x: 0, y: 0}});
  }


  render() {

    const {comment} = this.props;


    return (
      <Draggable onDrag={this.handleDrag} position={this.state.controlledPosition} axis="x" bounds={{left: 0, top: 0, bottom: 0 }}>
        <CommentRowContainer>

          <CommentPlayer >
            <PlayerTracker url={comment.location} />
          </CommentPlayer>

          <IdenticonContainer onClick={this.playOwner}>
            <Identicon id={`CommentUser${comment.id}`} data-jdenticon-hash={comment.owner_icon_hash} />
            <ReactPlayer url={`${config.streamingUrl}${comment.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />
          </IdenticonContainer>
        </CommentRowContainer>
      </Draggable>
    );
  }

}

const CommentRowContainer = styled.div`
  margin: 2px;
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
  background-color: lightgray;
  height: 1.5vw;
  width: 1.5vw;
  margin-right: 5%;

`;


const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;
