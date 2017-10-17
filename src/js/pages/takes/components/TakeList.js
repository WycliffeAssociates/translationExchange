import React, { Component } from "react";
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";
import update from "react/lib/update";
import { DropTarget } from "react-dnd";

class TakeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			takes: this.props.takes
		};
	}
	pushTake(take) {
		this.setState(
			update(this.state, {
				takes: {
					$push: [take]
				}
			})
		);
	}

	removeTake(index) {
		this.setState(
			update(this.state, {
				takes: {
					$splice: [[index, 1]]
				}
			})
		);
	}

	moveTake(dragIndex, hoverIndex) {
		const { takes } = this.state;
		const dragTake = takes[dragIndex];
		this.setState(
			update(this.state, {
				takes: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTake]]
				}
			})
		);
	}
	onMarkedForExportToggled(take) {
		let markedForExport = !take.take.is_publish;

		this.props.patchTake(
			take.take.id,
			{ is_publish: markedForExport },
			updatedTake => {
				//success callback
				if (markedForExport) {
					this.props.updateChosenTakeForChunk(updatedTake.id);

				}
			}
		);
	}

	onRatingSet(newRating, take) {

		this.props.patchTake(take.take.id, { rating: newRating }, () => {

		});
	}
	makeChanges(isPublish, newRating, take) {

		if (isPublish) {
      this.onMarkedForExportToggled(take);

 		}
       debugger;
			switch(newRating){
	      case 0:
				     return this.onRatingSet(1, take);
		    case 1:

			       return this.onRatingSet(2, take);
				case 2:
				     return this.onRatingSet(3, take);
			  case 3:
	         return this.onMarkedForExportToggled(take);
			  default:
				     return null;

	      }

    // if(newRating >1 ){
		// 	 this.onRatingSet(newRating -1, take);
		// }
		//
		// if (isPublish || newRating >= 3) {
		// 	this.onMarkedForExportToggled(take);
		// 	this.onRatingSet(newRating, take);
		// } else {
		// 	this.onRatingSet(newRating -1, take);
		// }
	}
	render() {
		const style = {
			minHeight: "231px"
		};
		const { takes } = this.state;
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div style={{ ...style }}>
				{takes.map((take, i) => {
					return (
						<div>
							<br />
							<TakeContainer
								take={take} // one take
								count={take.order}
								source={take.source}
								chunkNumber={this.props.chunkNumber}
								addToListenList={this.props.addToListenList}
								patchTake={this.props.patchTake}
								deleteTake={this.props.deleteTake}
								updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
								onClickSave={this.props.onClickSave}
								deleteComment={this.props.deleteComment}
								active={this.props.active}
								mode={this.props.mode}
								key={i}
								index={i}
								listId={this.props.ratingToGet}
								removeTake={this.removeTake.bind(this)}
								moveTake={this.moveTake.bind(this)}
								makeChanges={this.makeChanges.bind(this)}
							/>
						</div>
					);
				})}
			</div>
		);
	}
}

TakeList.propTypes = {
	takes: PropTypes.arrayOf(TakePropTypes).isRequired
};
const takeTarget = {
	drop(props, monitor, component) {
		const { ratingToGet } = props;
		const sourceObj = monitor.getItem();
		if (ratingToGet !== sourceObj.listId) {
			component.pushTake(sourceObj.take);
		}
		return { listId: ratingToGet };
	}
};

export default DropTarget("TakeContainer", takeTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(TakeList);
