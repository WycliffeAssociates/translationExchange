/* eslint indent: ["error", "tab", {SwitchCase: 1}] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TakeContainer from './TakeContainer';
import TakePropTypes from './TakePropTypes';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import 'css/takelist.css';

export class TakeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			takes: this.props.takes,
		};
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
			this.props.chunkId
		);
	}

	makeChanges(isPublish, newRating, take) {
		switch (newRating) {
			case 0:
				return this.onDrop(false, 1, take);
			case 1:

				return this.onDrop(false, 2, take);
			case 2:
				return this.onDrop(false, 3, take);
			case 3:
				return this.onDrop(true, take.rating, take);
			default:
				return null;

		}

	}

	render() {

		const { takes } = this.props;

		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<div className="TakeList">
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

				<TakePlaceHolder>

					<div>
						<label style={{display: 'block'}}> <i className = "fa fa-bars" /> </label>
						<br />
						<label style={{display: 'block'}}> Drag Here </label>
					</div>

				</TakePlaceHolder>
			</div>
		);
	}
}

const TakePlaceHolder = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 13.5vw;
	border: dashed 1.6px white;
	width: inherit;
	color: white;
	margin-top: 1vw;
	font-size: 1.1vw;
	`;


TakeList.propTypes = {
	takes: PropTypes.arrayOf(TakePropTypes).isRequired,
};
const takeTarget = {
	drop(props, monitor, component) {
		const { ratingToGet } = props;
		const sourceObj = monitor.getItem();
		if (ratingToGet !== sourceObj.listId) {
			component.pushTake(sourceObj.take);
		}
		return { listId: ratingToGet };
	},
};


export default DropTarget('TakeContainer', takeTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(TakeList);
