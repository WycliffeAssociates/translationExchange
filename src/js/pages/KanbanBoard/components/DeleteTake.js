import React from 'react';
import styled from 'styled-components';
import {DropTarget} from 'react-dnd';

class DeleteTake extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {connectDropTarget, isOver} = this.props;

    return connectDropTarget(
      <div style={styles.container}>
        <DeleteContainer isOver={isOver}>
          <DeleteTarget isOver={isOver}>
            <i className="material-icons">delete</i>
          </DeleteTarget>
        </DeleteContainer>
      </div>
    );
  }

}

const styles = {
  container: {
    position: 'fixed',
    bottom: '10vh',
    right: '25vw',
    zIndex: '101',
    width: '10%',
    height: '10%',
  },

};

const DeleteContainer = styled.div`
  margin: auto;
  height: ${props => props.isOver? '100px': '75px'};
  width: ${props => props.isOver? '100px': '75px'};
  border-radius: ${props => props.isOver? '50px': '40px'};
  background: ${props => props.isOver? 'linear-gradient(to top, #820C00, #E74C3C)': 'linear-gradient(to top, #0076FF , #00C5FF )'};
`;

const DeleteTarget = styled.div`
  color: white;
  text-align: center;
  padding-top: ${props => props.isOver? '25px': '15px'};
  i{
    font-size: 36px;
  }
`;



const deleteTarget = {
  drop(props, monitor, component) {
    const { listId } = props;
    return { listId: listId };
  },
};


export default DropTarget('TakeCard', deleteTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(DeleteTake);
