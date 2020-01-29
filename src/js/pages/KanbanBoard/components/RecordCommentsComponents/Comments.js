import React, {Component} from 'react';
import styled from 'styled-components';
import Player from './Player';
import RecordCommentsModal from './RecordCommentsModal';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state={ displayModal: false };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({displayModal: false});
    this.props.resetError();
  }


  render() {
    const {comments, text, id, type, saveComment, uploadingComments,uploadError,  chunkId, chunkNum, txt, deleteComment} = this.props;
    //id corresponds to either the chapterId, chunkId or the takeID so that the comment is saved and attached to the appropriate element
    return (
      <Container>
        <TextContainer>
          <TextHeader> {text} </TextHeader>
          <SvgContainer>
            <SvgLine />
          </SvgContainer>
        </TextContainer>
        <AudioContainer>
          {comments? comments.length > 0 ? <div> {comments.map(((cm)=> <Player typeId={id} deleteComment={deleteComment} type={type}  id={cm.id} comments={cm} txt={txt} key={cm.id} />  ))}</div> : <NoComments>{txt.get("noCommentsAvailable")}</NoComments> : <NoComments>{txt.get("noCommentsAvailable")}</NoComments>  }
        </AudioContainer>
        <ButtonContainer>
          <RecordButton onClick={()=>{this.setState({displayModal: true});}}>
            <i style={{fontSize: '1.6vw', paddingTop: '.5vw'}} className="material-icons">mic_none</i>
          </RecordButton>
          <RecordCommentsModal
            chunkNum={chunkNum}
            chunkId={chunkId}
            uploadError = {uploadError}
            uploadingComments={uploadingComments}
            closeModal={()=>this.closeModal()}
            saveComment={saveComment}
            id={id}
            type={type}
            txt={txt}
            location={this.props.location}
            display={this.state.displayModal} />
        </ButtonContainer>
      </Container>
    );
  }
}
const Container = styled.div`
  padding-top: 1vw;
`;
Container.displayName = 'Container';

const SvgContainer = styled.div`
  width:60%;
`;
SvgContainer.displayName = 'SvgContainer';

const RecordButton = styled.button`
  background-color: #E74C3C;
  border: none;
  height: 3vw;
  width: 3vw;
  border-radius: 80%;
  color: white;
  outline: none;
  border-color: transparent;
  cursor: pointer;
  font-size: 1vw;
`;
RecordButton.displayName = 'RecordButton';
const SvgLine = ()=>{ return ( <svg height="5">
  <line x1=".5vw" y1="0" x2="8vw" y2="0" style={{stroke: 'rgb(255,255,255)', strokewidth: 2}} />
</svg>);};
SvgLine.displayName = 'SvgLine';

const TextHeader = styled.p`
  color: #fff;
  padding-left: .5vw;
  font-size: 1vw;
`;
TextHeader.displayName = 'TextHeader';

const NoComments = styled.p`
  color: #969595;
  text-align: center;
  padding-top: 1vw;
  font-style: italic;
  font-size: 1vw;
`;
NoComments.displayName = 'NoComments';

const TextContainer = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: center;
`;
TextContainer.displayName = 'TextContainer';

const AudioContainer = styled.div`
`;
AudioContainer.displayName = 'AudioContainer';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.5vw;
`;
ButtonContainer.displayName = 'ButtonContainer';



export default Comments;
