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
			takesToDelete.push(take.id);
            return null; // added to satisfy warning of return expected on arrow function
		});

		//remove them all
		takesToDelete.map(takeId => {
			this.props.deleteTake(takeId);
            return null; // added to satisfy warning of return expected on arrow function
		});
	}

	render() {
		return (
			<Grid.Column >
				<Table textAlign="center" style={{background: 'rgba(45,45,45,0.3)'}}>
					<Table.Header style={{background: 'rgba(45,45,45,0.4)'}}>
						<Table.Row>
							<Table.HeaderCell  style={{background: 'rgba(45,45,45,0.3)'}}>
								{this.props.icon}
								{
									// this.props.deleteButton && this.props.orderedTakes.length > 0
									// ? <Button
									// 	floated="left"
									// 	icon
									// 	onClick={this.deleteAllColumnTakes.bind(this)}
									// >
									// 	<Icon name="trash" color="red" />
									// </Button>
									// : ""
								}
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Cell className="ChunkTitle"
					style={{background: 'rgba(45,45,45,0.3)'}}
					>

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
							chunkId={this.props.chunkId}

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
