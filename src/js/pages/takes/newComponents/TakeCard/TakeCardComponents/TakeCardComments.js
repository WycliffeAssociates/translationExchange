import React from 'react';
import styled,{keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import CommentRow from './TakeCardCommentRow';
import RecordCommentsModal from '../../../../KanbanBoard/components/RecordCommentsComponents/RecordCommentsModal';
export default class TakeCardComments extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      displayModal: false,
    };

    this.recordButton = this.recordButton.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({displayModal: false});
  }


  recordButton() {
    const { id, saveComment, uploadingComments, activeChunkId, chunkNum} = this.props;
    const microphone =  <i style={{fontSize: '1.6vw', paddingTop: '.5vw', paddingRight: '.2vw'}} className="material-icons">mic_none</i>;
    return (
      <div style={{backgroundColor: '#E74C3C', width: '4vw'}}>

        <RecordComment onClick = {()=> {this.setState({displayModal: true});}}>
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
          />
        </RecordComment>

      </div>

    );
  }


  render() {
    const {comments, txt} = this.props;
    return (
      <Comments>
        {
          comments.length!==0 ?
            comments.map((comment) => {
              return (  <CommentRow key= {comment.id} comment= {comment} />);

            })
            :
            ''
        }
        <MoreOptions>

          <LoadMore>
            <i className="material-icons">add_circle</i>
            {` ${txt.loadMore}`}
          </LoadMore>

          {this.recordButton()}

        </MoreOptions>

      </Comments>
    );
  }

}

const fadeInAnimation = keyframes`${fadeIn}`;

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
animation: ${fadeInAnimation} .5s ease-in;
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
  cursor: pointer;

`;
