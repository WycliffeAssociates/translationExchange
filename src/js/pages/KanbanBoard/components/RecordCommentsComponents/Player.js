import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import ReactPlayer from 'react-player';
import CommentsPlayer from './CommentsPlayer';
import config from '../../../../../config/config';
import { toast} from 'react-toastify'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      id: null,
      deleteComment: true,
    };
    this.play = this.play.bind(this);
    this.ended = this.ended.bind(this);
  }

  play() {
    this.setState({playing: true});
  }

  ended() {
    this.setState({playing: false});
  }

  deleteComment() {
    const { deleteComment, type, id, typeId } = this.props; // id is the comment id, typeId can be chunkId or chapterId and is used to update comments on delete
    if (this.state.deleteComment) {
      deleteComment(id, type, typeId);
    }
    this.setState({deleteComment: true})
  }

  deleteToast() {
    toast(<Msg txt={this.props.txt} redo={()=> this.setState({deleteComment: false})} />, {
      position: toast.POSITION.BOTTOM_CENTER,
      className: 'page-bar',
      onClose: () => this.deleteComment(),
      autoClose: 5000,
    });
  }

  componentDidMount() {
    const {owner_icon_hash} =this.props.comments || '' ;
    const id = owner_icon_hash.slice(0, 8);
    jdenticon.update(`#canvas${id}` , owner_icon_hash? owner_icon_hash: 'null user');

  }


  render() {
    const { comments} = this.props;
    const id = comments.owner_icon_hash? comments.owner_icon_hash.slice(0, 8): 'null user';

    return (
      <Container>
        <IdenticonContainer>
          <Identicon onClick={()=>this.play()} id={`canvas${id}`} data-jdenticon-hash={comments.owner_icon_hash} />
          <ReactPlayer style={{display: 'none'}} url={`${config.streamingUrl}${comments.owner_name_audio}`} playing={this.state.playing} onEnded={()=> this.ended()}  />

        </IdenticonContainer>
        <AudioContainer>
          <CommentsPlayer audioFile={`${config.streamingUrl}${comments.location}`} />
        </AudioContainer>
        <NewTextContainer onClick={()=>this.deleteToast()}>
          <NewText><i className="material-icons">delete</i></NewText>
        </NewTextContainer>

      </Container>
    )
  }
}

const Msg = ({ redo, txt }) => (
<DeleteContainer>
    {txt.get("deletingComment")}
    <BlueButton onClick={redo}>{txt.get("undo")} <i class="material-icons">redo</i></BlueButton>
</DeleteContainer>
);

const DeleteContainer = styled.div`
  background-color:transparent;
  color:white;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BlueButton= styled.button`
  border-radius: 20px
  color: white;
  background: linear-gradient( #0076FF, #00C5FF );
  padding: 0.4vw 2vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  i{
    vertical-align: middle;
  }
`;

const Container = styled.div`
  padding-top: 1vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;

const AudioContainer = styled.div`

`;

const NewText = styled.p`
  color: white;
  font-size: 1vw;
`;

const NewTextContainer = styled.div`
  width: 2vw;
  cursor: pointer;

`;

const IdenticonContainer =styled.div`
  background-color: white;
  height: 1.5vw;
  width: 1.5vw;

`;

export default Player;
