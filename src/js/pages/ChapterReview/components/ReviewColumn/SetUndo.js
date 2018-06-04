import React from 'react';
import styled from 'styled-components';
import RecordCommentsModal from '../../../KanbanBoard/components/RecordCommentsComponents/RecordCommentsModal';

export default class SetUndo extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      displayModal: false,
    };
    this.handleSet = this.handleSet.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSet() {
    this.setState({displayModal: true});
  }

  closeModal() {
    const {tempTakes, index, take, alternateTakes} = this.props;
    this.setState({displayModal: false});
    this.props.setTake(take.publishedTake.id,tempTakes[index], index, alternateTakes);

  }

  render() {
    const {tempTakes, index, chunkId, txt, saveComment, location} = this.props;
    return (
      <Container>

        <SetButton
          onClick ={this.handleSet}>
          <i className="material-icons">done</i> Set </SetButton>

        <UndoButton onClick={()=> this.props.undoSwapTake(tempTakes[index],index)}> <i className="material-icons">close</i> Undo </UndoButton>

        <RecordCommentsModal
          closeModal={()=>this.closeModal()}
          saveComment={saveComment}
          id={chunkId}
          type={'chunk'}
          txt={txt}
          location={location}
          display={this.state.displayModal} />

      </Container>
    );
  }

}

const Container = styled.div`
  background: #1B2633;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 15vh;
  padding: 2.5%;
  justify-content: space-evenly;
`;
Container.displayName='Container';

const SetButton = styled.button`
  border: none;
  padding: 1.5%;
  border-radius: 5px;
  background: linear-gradient(to top, #0076FF, #00C5FF);
  color: white;
  i{
    vertical-align: middle;
  }
`;
SetButton.displayName='SetButton';

const UndoButton = styled(SetButton)`
background: #39414A;

`;
UndoButton.displayName='UndoButton';
