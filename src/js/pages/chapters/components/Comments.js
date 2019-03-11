import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import RecordCommentsModal from '../../KanbanBoard/components/RecordCommentsComponents/RecordCommentsModal';
import CommentRow from '../../../components/CommentRow';
import noCommentsImg from '../../../../assets/images/no_comments.svg';


export default class Comments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displayModal: false,
      playing: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.ended = this.ended.bind(this);
    this.playOwner = this.playOwner.bind(this);

  }

  closeModal() {
    this.setState({displayModal: false});
  }

  openModal() {
    this.setState({displayModal: true});
  }

  ended() {
    this.setState({playing: false});
  }

  playOwner() {
    this.setState({playing: true});
  }


  componentDidMount() {
    const {comments} = this.props;
    const cardWidth = this.myInput.offsetWidth;
    this.setState({cardWidth});
    comments.map((comment) => {
      jdenticon.update(`#CommentUser${comment.id}`, comment.owner_icon_hash);
    });
  }


  render() {
    const {comments, id, uploadingComments, saveComment, saveChapterPageComment, deleteComment, txt} = this.props;


    return (
      <Container>
        <div ref={input => {this.myInput = input;}} style={{height: '70%', flex: '1', overflowY: 'auto', overflowX: 'hidden'}}>
          {
            comments.length!==0?
              comments.map( (comment) => {
                return (
                  <CommentRow txt={txt} type= "chapterCard" chapterId={id}  deleteComment={deleteComment} width={this.state.cardWidth} id={comment.id} key= {comment.id} comment= {comment} />
                );

              }):
              <img src={noCommentsImg} height="150px" width= "150px" />
          }
        </div>
        <ButtonContainer>
          <MicButton onClick={this.openModal}>
            <i className="material-icons">mic</i>
          </MicButton>
        </ButtonContainer>


        <RecordCommentsModal display = {this.state.displayModal}
          uploadingComments={uploadingComments}
          closeModal = {()=> this.closeModal()}
          id={id}
          saveComment = {saveComment}
          type={'chapter'}
          txt={this.props.txt}
          chapterPageComment={true}
          saveChapterPageComment={saveChapterPageComment}
          {...this.props}
        />
      </Container>
    );
  }

}



const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;
Container.displayName = 'Container';

const CommentContainer = styled.div`
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
CommentContainer.displayName = 'CommentContainer';


const CommentPlayer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
CommentPlayer.displayName = 'CommentPlayer';


const IdenticonContainer =styled.div`
  background-color: white;
  height: 1.5vw;
  width: 1.5vw;
  margin-left: 2.5%;
`;
IdenticonContainer.displayName = 'IdenticonContainer';


const Identicon= styled.svg`
    height: 1.5vw;
    width: 1.5vw;
    cursor:pointer;
`;
Identicon.displayName = 'Identicon';


const ButtonContainer= styled.div`
    width: 190px;
    margin-top: 40px;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
    display: flex;
    justify-content:center;
    border-radius: 5px;
    min-height: 40px;
    justify-content: flex-end;
`;
ButtonContainer.displayName = 'ButtonContainer';

const MicButton= styled.button`
  display:flex;
  justify-content: center;
  color: white;
  background: linear-gradient(to bottom, #830C00, #E74C3C);
  font-size: 16px;
  font-weight: 100;
  border: none;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  margin: auto;
  text-align: center;
  min-height: 40px;
  width: inherit;

  i {
    vertical-align: middle;
    font-size: 16px;
    margin-left: 10px;
  }
`;
MicButton.displayName = 'MicButton';
