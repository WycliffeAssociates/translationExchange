import React, { Component } from "react";
import TakeList from "./TakeList";
import { connect } from "react-redux";
import { Table, Grid, Button, Icon } from "semantic-ui-react";
import "css/takes.css";

class TakeTable extends Component {


	deleteAllColumnTakes() {
		//get a list of the take ID's to delete
		let takesToDelete = [];
		this.props.orderedTakes.map(take => {
			takesToDelete.push(take.take.id);
		});

		//remove them all
		takesToDelete.map(takeId => {
			this.props.deleteTake(takeId);
		});
	}

	render() {
		return (
			<Grid.Column>
				<Table textAlign="center">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>
								{this.props.icon}
								{this.props.deleteButton && this.props.orderedTakes.length > 0
									? <Button
										floated="left"
										icon
										onClick={this.deleteAllColumnTakes.bind(this)}
									>
										<Icon name="trash" color="red" />
									</Button>
									: ""}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Cell className="ChunkTitle">
						<TakeList
							takes={this.props.orderedTakes}
							addToListenList={this.props.addToListenList}
							patchTake={this.props.patchTake}
							deleteTake={this.props.deleteTake}
							updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
							onClickSave={this.props.onClickSave}
							ratingToGet={this.props.column}
							chunkNumber={this.props.chunkNumber}
							mode={this.props.mode}
							deleteComment={this.props.deleteComment}
							active={this.props.active}
						/>
					</Table.Cell>
				</Table>
			</Grid.Column>
		);
	}
}


const mapStateToProps = state => {
	const {  takes } = state.chunkListContainer;
	return { takes };
}

export default connect(mapStateToProps)(TakeTable);
