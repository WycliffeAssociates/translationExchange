import React from 'react';
import styled from 'styled-components';

import TakeCard from '../../takes/newComponents/TakeCard/TakeCard';
import update from 'immutability-helper';
import {DropTarget} from 'react-dnd';

class KanbanColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      take: this.props,
    };

    this.makeChanges = this.makeChanges.bind(this);
    this.removeTake = this.removeTake.bind(this);
  }

  pushTake(take) {
    this.setState(
      update(this.state, {
        takes: {
          $push: [take],
        },
      })
    );
  }

  removeTake(index) {
    this.setState(
      update(this.state, {
        takes: {
          $splice: [[index, 1]],
        },
      })
    );
  }

  moveTake(dragIndex, hoverIndex) {
    const { takes } = this.state;
    const dragTake = takes[dragIndex];
    this.setState(
      update(this.state, {
        takes: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragTake]],
        },
      })
    );
  }

  onDrop(published, newRating, take) {
    this.props.patchTake(
      take.id,
      { published: published, rating: newRating },
      updatedTake => {
      //success callback
        if (published) {
          this.props.updateChosenTakeForChunk(updatedTake.id);
        }
      },
      this.props.takes,
      this.props.chunkId
    );
  }

  makeChanges(isPublish, newRating, take) {
    switch (newRating) {
      // the cases line up with the list id's specified in KanbanBoard.js 0/1 is 1 star, 2 is 2 star, 3 is 3 star, 4 is publised
      // problem is that the max for ratings is 3. differntiation between 3 star and published is a boolean flag
      case 0:
        return this.onDrop(false, 1, take);

      case 1:

        return this.onDrop(false, 1, take);

      case 2:
        return this.onDrop(false, 2, take);

      case 3:
        return this.onDrop(false, 3, take);

      case 4:
        return this.onDrop(true, 3, take);

      default:
        return null;

    }

  }


  render() {

    const { connectDropTarget, isOver} = this.props;

    var icon;
    switch (this.props.icon) {

      case 1:
        icon= <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
        break;

      case 2:
        icon = (
          <div className="labelLines">
            <label> <i className="far fa-star fa-2x" /> </label>
            <label> <i className="far fa-star fa-2x" /> </label>
          </div>
        );
        break;

      case 3:
        icon = (
          <div className="labelLines">
            <label > <i className="far fa-star fa-2x" /> </label>
            <label > <i className="far fa-star fa-2x" /> </label>
            <label > <i className="far fa-star fa-2x" /> </label>
          </div>
        );
        break;

      case 4:
        icon = <label className="labelLines"> <i className="fas fa-check fa-2x" /> </label>;
        break;

      default:
        icon= <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
        break;
    }

    return connectDropTarget(
      <div style={{background: isOver? 'yellow': ''}}>
        <Column>
          <div>
            <center> {icon} </center>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', overflow: 'auto'}}>
            {
              this.props.array.map((take) => {
                return (<TakeCard {...take} makeChanges= {this.makeChanges} removeTake = {this.removeTake} displayText = {this.props.displayText} /> );
              })
            }
          </div>

        </Column>
      </div>
    );
  }

}



const Column = styled.div`
  height: auto;
  width: auto;
  background: rgba(45,45,45,0.5);
  padding: 2vw;
  margin: 1vw;
  border-radius: 1vw;


`;

const takeTarget = {
  drop(props, monitor, component) {
    const { listId } = props;
    const sourceObj = monitor.getItem();
    if (listId !== sourceObj.listId) {
      //component.pushTake(sourceObj.take);
    }
    return { listId: listId };
  },
};


export default DropTarget('TakeCard', takeTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(KanbanColumn);
