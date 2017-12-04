import React, { Component } from "react";
import TakePropTypes from "./TakePropTypes";
import Take from "./Take";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import flow from "lodash/flow";
class TakeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggleOn: true,
			ratingLoading: false
		};
	}

	onDeleteTake() {
		this.props.deleteTake(this.props.take.id);
	}
	render() {
		const { connectDragSource, connectDropTarget } = this.props;
		return connectDragSource(
			connectDropTarget(
				<div>
					<Take
						count={this.props.count}
						take={this.props.take}
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
					/>
				</div>
			)
		);
	}
}

TakeContainer.propTypes = {
	take: TakePropTypes
};
const takeSource = {
	beginDrag(props) {
		return { index: props.index, listId: props.listId, take: props.take };
	},

	endDrag(props, monitor) {

		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		if (dropResult && dropResult.listId !== item.listId) {
			props.removeTake(item.index);
			props.makeChanges(
				item.take.published,
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
	DropTarget("TakeContainer", takeTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource("TakeContainer", takeSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(TakeContainer);
