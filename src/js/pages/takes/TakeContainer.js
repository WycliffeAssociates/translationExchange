import React, { Component } from "react";
import TakePropTypes from "./components/TakePropTypes";
import Take from "./components/Take";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget, DragPreview} from "react-dnd";
import flow from "lodash/flow";
import objectAssign from 'object-assign';
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import ItemPreview from './components/ItemPreview';




class TakeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true,
			ratingLoading: false,
			height:null,
			width: null


		};
	}

	componentDidMount () {
	 const height = this.myInput.offsetHeight;
	 const width = this.myInput.offsetWidth;
	 this.setState({height, width });
 }

	onDeleteTake() {
		this.props.deleteTake(this.props.take.take.id);
	}



	generatePreview(type, item, style) {
	    objectAssign(style, {backgroundColor: '#fff', width: '50px', height: '50px'});
	    return <div style={style}>hello</div>;
	  }


	render() {
		const { connectDragSource, connectDropTarget, connectDragPreview, isDragging } = this.props;



    const style = { opacity: isDragging ? 0.7 : 1 };

   let content = (

<div>
		 <div ref={input => {this.myInput = input}} className="item" style= {style}>

		 <Take
			 count={this.props.count}
			 take={this.props.take.take}
			 author={this.props.take.user}
			 chunkNumber={this.props.chunkNumber}
			 ratingLoading={this.state.ratingLoading}
			 source={this.props.source}
			 comments={this.props.take.comments}
			 addToListenList={this.props.addToListenList}
			 onDeleteTake={this.onDeleteTake.bind(this)}
			 onClickSave={this.props.onClickSave}
			 deleteComment={this.props.deleteComment}
			 active={this.props.active}
			 mode={this.props.mode}
			 height= {this.state.height}
			 width= {this.state.width}
		 />

	 </div>
	 <ItemPreview
 	 count={this.props.count}
 	 take={this.props.take.take}
 	 author={this.props.take.user}
 	 chunkNumber={this.props.chunkNumber}
 	 ratingLoading={this.state.ratingLoading}
 	 source={this.props.source}
 	 comments={this.props.take.comments}
 	 addToListenList={this.props.addToListenList}
 	 onDeleteTake={this.onDeleteTake.bind(this)}
 	 onClickSave={this.props.onClickSave}
 	 deleteComment={this.props.deleteComment}
 	 active={this.props.active}
 	 mode={this.props.mode}

 	key="__preview" name="TakeContainer" />

</div>
 );







	 // Connect as drag source
			content = connectDragSource(content, { dropEffect: 'move' });
			// Connect as drop target
			content = connectDropTarget(content);
			// Connect to drag layer
			content = connectDragPreview(content);


		return content;






	}
}

TakeContainer.propTypes = {
	take: TakePropTypes
};
const takeSource = {
	beginDrag(props, monitor, component) {
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
		return { index: props.index, listId: props.listId, take: props.take, rect:hoverBoundingRect };
	},

	endDrag(props, monitor) {

		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult && dropResult.listId !== item.listId) {
			props.removeTake(item.index);
			props.makeChanges(
				item.take.take.is_publish,
				dropResult.listId,
				item.take
			);
		}
	}
};


const takeTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;
		const sourceListId = monitor.getItem().listId;
		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();
		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		if (props.listId === sourceListId) {
			props.moveTake(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			monitor.getItem().index = hoverIndex;
		}
	}
};





export default flow(
	DropTarget("TakeContainer", takeTarget, (connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		  isOver: monitor.isOver()


	})),
	DragSource("TakeContainer", takeSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()

	}))
)(TakeContainer);
