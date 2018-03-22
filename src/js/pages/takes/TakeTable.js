/* eslint indent: [1, "tab", {SwitchCase: 1}]*/
import React, { Component } from 'react';
import styled from 'styled-components';
import TakeList from './TakeList';
import { connect } from 'react-redux';
import { Table, Grid, Button, Icon } from 'semantic-ui-react';
import 'css/takes.css';

class TakeTable extends Component {

	constructor(props) {
		super(props);

		this.nextChunk = this.nextChunk.bind(this);
	}

	nextChunk() {

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

			console.log(this.props.takes[i].published, 'RATING');

			if (this.props.takes[i].published) {
				itemPublised = true;
				break;
			}
		}


		console.log(this.props, 'Props from Take table');
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
						this.props.icon4marker ? <NextChunk onClick ={this.nextChunk}>Go to Chunk {this.props.chunkId+1} <i className="fa fa-arrow-right" /> </NextChunk> : ''

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
`;




const mapStateToProps = state => {
	const {  takes } = state.chunkListContainer;
	return { takes };
};

export default connect(mapStateToProps)(TakeTable);
