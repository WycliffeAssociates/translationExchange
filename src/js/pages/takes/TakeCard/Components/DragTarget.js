import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'css/notification.css';
import propTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

export class DragTarget extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }


  render() {

    const {connectDragSource , isDragging} = this.props;


    return  connectDragSource(
      <div>
        <DragIcon>
          <i className = "material-icons">menu</i>
        </DragIcon>
      </div>
    );
  }

}

const DragIcon = styled.button`
  border: none;
  font-size: 1.5vw;
  color: gray;
  background: none;
  cursor: pointer;
  margin-top: 0.8vw;

`;

let undo= false;

const UndoToast = ({closeToast, props}) => {

  function handleClick() {
    undo = true;
    closeToast();
  }

  return (
    <div style={{textAlign: 'center', color: 'white'}}>
      <p>{props.txt.deletingTake} </p>
      <Undo onClick={handleClick}> {props.txt.undo}<i className="material-icons">undo</i> </Undo>
    </div>
  );

};

function showUndoToast(props) {
  toast(<UndoToast props={props} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    closeOnClick: true,
    className: 'black-background',
    onClose: () => {
      if (undo === true) {
        //do not delete the take
      }
      else if (undo === false) {
        props.deleteTake(props.id, props.activeChunkId, props.chunkNum);
      }
    },

  });
}

const ConfirmDelete = ({closeToast,props }) => (
  <div style= {{textAlign: 'center'}}>
    <p> {props.txt.deleteTake} </p>
    <ButtonContainer>
      <Confirm onClick={() => (showUndoToast(props), closeToast())}>
        {props.txt.confirm} <i className="material-icons">done_all</i>
      </Confirm>
      <Undo onClick={closeToast}> {props.txt.undo}<i className="material-icons">undo</i> </Undo>
    </ButtonContainer>
  </div>
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Confirm = styled.button`
  min-height: 40px;
  min-width: 90px;
  background: linear-gradient(to top, #820C00, #E74C3C);
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  i {
    vertical-align: middle;
    text-decoration: none;
  }

`;

const Undo = styled.button`
  min-height: 40px;
  min-width: 90px;
  background: linear-gradient(to top, #0076FF, #00C5FF);
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  i {
    vertical-align: middle;
    text-decoration: none;
  }
`;


DragSource.propTypes = {
  count: propTypes.number.isRequired,
  take: propTypes.object.isRequired,
  author: propTypes.string.isRequired,
  onRatingSet: propTypes.func.isRequired,
  onMarkedForExportToggled: propTypes.func.isRequired,
  takeId: propTypes.number.isRequired,
  connectDragPreview: propTypes.func.isRequired,
};

const takeSource = {
  beginDrag(props, monitor, component) {

    return { index: props.id, rating: props.rating, take: props, active: props.active, publishedTake: props.publishedTake };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.listId !== item.rating) //CHECK DROP DESTINATION VS CARD ORIGIN
    {

      if (dropResult.listId === 4) //CHECK PUBLISHED COLUMN
      {
        if (item.take.published === false && props.publishedTake == true) {
          toast.error(props.txt.alreadyPublished,
            {
              position: toast.POSITION.TOP_CENTER,
            });

        }

        else // MOVE TAKE TO EMPTY PUBLISHED COLUMN{
          props.makeChanges(
            item.take.published,
            dropResult.listId,
            item.take
          );
      }


      else if (dropResult.listId === 'DELETE_TAKE') //CHECK DELETE TARGET
      {
        toast(<ConfirmDelete props={props} />, {
          position: toast.POSITION.BOTTOM_CENTER,
          className: 'black-background',
          autoClose: 10000,
          closeOnClick: false,
        });
      }
      else // DEFAULT MOVE TAKE
      {
        props.makeChanges(
          item.take.published,
          dropResult.listId,
          item.take
        );
      }
    }

    else if (dropResult && dropResult.listId === 3 && item.rating === 3) {

      props.makeChanges(
        item.take.published,
        dropResult.listId,
        item.take
      );
    }
  },

};


export default
DragSource('TakeCard', takeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))(DragTarget);
