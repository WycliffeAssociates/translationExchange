/* eslint indent: [1, "tab", {SwitchCase: 1}]*/
import React, { Component } from 'react';
import styled from 'styled-components';
import TakeList from './TakeList';
import { connect } from 'react-redux';
import { Table, Grid, Button, Icon } from 'semantic-ui-react';
import 'css/takes.css';
import { getAudioTakes, getChunkIdClicked } from './../../actions';
import {bindActionCreators} from 'redux';


class TakeTable extends Component {

	constructor(props) {
		super(props);

		this.nextChunk = this.nextChunk.bind(this);
		this.getTakes= this.getTakes.bind(this);
	}

	nextChunk(chunkId) {
		this.getTakes(chunkId+1);
	}


	getTakes(chunkId) {
		let counter = this.props.takes.length;
		let { calledChunks } = this.props;
		if (!calledChunks.includes(chunkId)) {                 // once you click a chunk, checks if the chunk has not been clicked before
			this.props.getChunkIdClicked(chunkId);
			this.props.getAudioTakes(chunkId, counter);               // if it has not been clicked we call api and add the chunk id to the list of chunks clicked
			// so next time clicked to close it won't call the api
		}
	}


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

		var itemPublised = false;

		for (var i=0; i<this.props.takes.length; i++) {


			if (this.props.takes[i].published) {
				itemPublised = true;
				break;
			}
		}


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
							height={this.props.height}
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

				{
					itemPublised?
						this.props.icon4marker ? <NextChunk onClick ={() => this.nextChunk(this.props.chunkId)}>Go To Next Chunk <i className="fa fa-arrow-right" /> </NextChunk> : ''

						: ''
				}

			</Grid.Column>

		);
	}
}


const NextChunk = styled.button`
	color: white;
	background: linear-gradient(to right, #0076FF, #00C5FF  );
	border: none;
	border-radius: 2vw;
	padding: 0.75vw;
	cursor: pointer;
`;




const mapStateToProps = state => {
	const { takes, update, chunkIdClicked, calledChunks } = state.chunkListContainer;
	return { takes, update, chunkIdClicked, calledChunks };
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			getAudioTakes,
			getChunkIdClicked,
		}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(TakeTable);
