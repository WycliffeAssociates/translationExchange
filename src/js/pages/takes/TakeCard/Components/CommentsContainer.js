import React from 'react';
import styled,{keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import CommentRow from '../../../../components/CommentRow';
import RecordCommentsModal from '../../../KanbanBoard/components/RecordCommentsComponents/RecordCommentsModal';


export default class CommentsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      displayModal: false,
      width: 0,
      playing: false,
    };

    this.recordButton = this.recordButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({displayModal: false});
  }

  componentDidMount() {
    const width = this.myInput.offsetWidth;
    this.setState({width});
  }

  recordButton() {
    const { id, saveComment, uploadingComments, activeChunkId, chunkNum,location} = this.props;
    const microphone =  <i className="material-icons">mic_none</i>;
    return (
      <RecordButton onClick = {()=> {this.setState({displayModal: true});}}>
        {microphone}
        <RecordCommentsModal display = {this.state.displayModal}
          chunkNum={chunkNum}
          chunkId={activeChunkId}
          uploadingComments={uploadingComments}
          closeModal = {()=> this.closeModal()}
          id={id}
          saveComment = {saveComment}
          type={'take'}
          txt={this.props.txt}
          location={location}
        />
      </RecordButton>

    );
  }


  render() {
    const {comments, deleteComment, txt} = this.props;
    const {width} = this.state;
    const hasComments = comments.length!==0? true: false;
    return (
      <Container innerRef={input => {this.myInput = input;}} >
        <Comments hasComments ={hasComments}>
          {
            comments.length!==0 ?
              comments.map((comment) => {
                return (<CommentRow type= "take" txt ={txt} deleteComment={deleteComment} width={width} id={comment.id} key= {comment.id} comment= {comment} />);

              })
              :
              ''
          }
        </Comments>

        <ButtonContainer>

          {this.recordButton()}

        </ButtonContainer>

      </Container>
    );
  }

}

const fadeInAnimation = keyframes`${fadeIn}`;


const Container = styled.div`
  `;

const Comments = styled.div`
height: ${props => props.hasComments? '100px': '0px'};
overflow-y: scroll;
overflow-x: hidden;
animation: ${fadeInAnimation} .5s ease-in;
background: white;


  /* width */
  ::-webkit-scrollbar {
    width: 0.3vw;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {

    background: #969595;
  }


  /* Handle on hover*/

  ::-webkit-scrollbar-thumb: hover {
      background: #00C5FF;
  }

`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background-color: white;
width: 100%;
padding: 5px;
`;

const RecordButton = styled.div`
  border: 10px solid lightgray;
  height: 55px;
  width: 55px;
  border-radius: 50px;
  color: #E74C3C;
  cursor: pointer;
  text-align: center;
  padding-top: 5px;

  i {
    font-size: 28px;
  }

`;
