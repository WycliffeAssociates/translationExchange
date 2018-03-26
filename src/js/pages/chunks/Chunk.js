/* eslint indent: [1, "tab", {SwitchCase: 1}] */
import React, { Component } from 'react';
import ChunkPropTypes from './ChunkPropTypes';
import { Accordion, Icon, Grid } from 'semantic-ui-react';
import TakeTable from '../takes/TakeTable';
import 'css/takes.css';
import { connect } from 'react-redux';
import jdenticon from 'jdenticon';
import { bindActionCreators } from 'redux';
import { getAudioTakes, getChunkIdClicked } from './../../actions';

import ChunkSidebar from '../takes/components/SideBar';
class Chunk extends Component {

	constructor(props) {
		super(props);
		this.state = {
			calledChunks: [],
			chunkId: '',
		};
	}

	componentDidMount() {
		//jdenticon.update('undefined');
		this.getTakes(this.props.selectedChunk);
	}

	componentDidUpdate() {
		this.getTakes(this.props.selectedChunk);

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

	render() {
		console.log(this.props.selectedChunk, 'this is chunk props');
		let publish = [];
		let onestar = [];
		let twostar = [];
		let threestar = [];

		let orderedTakes = this.props.takes;
		const has_comments = this.props.has_comments;
		orderedTakes.map(tk => {
			if (this.props.id === tk.chunkId) {   // get takes corresponding just to the selected chunk
				const lastChars = tk.location.slice(-6);
				const takeNum = lastChars.slice(0,2);    // meantime solution for the take number, got it from
				//take file name
				tk.order = takeNum;
				if (tk.published) {
					publish[publish.length] = tk;

				} else if (tk.rating < 2) {
					onestar[onestar.length] = tk;

				} else if (tk.rating === 2) {
					twostar[twostar.length] = tk;

				} else if (tk.rating === 3) {
					threestar[threestar.length] = tk;

				}
			}
			return null;
		});
		let modeLabel = '';
		switch (this.props.mode) {
			case 'chunk':
				modeLabel = this.props.displayText.chunk;
				break;
			case 'verse':
				modeLabel = this.props.displayText.verse;
				break;
			default:
				modeLabel = this.props.displayText.segment;
		}
		var icon1 = <label className="labelLines"> <i className="far fa-star fa-2x" /> </label>;
		var icon2 = (
			<div className="labelLines">
				<label> <i className="far fa-star fa-2x" /> </label>
				<label> <i className="far fa-star fa-2x" /> </label>
			</div>
		);
		var icon3 = (
			<div className="labelLines">
				<label > <i className="far fa-star fa-2x" /> </label>
				<label > <i className="far fa-star fa-2x" /> </label>
				<label > <i className="far fa-star fa-2x" /> </label>
			</div>
		);
		var icon4 = <label className="labelLines"> <i className="fas fa-check fa-2x" /> </label>;
		return (
			<div>
				{/*<Accordion fluid styled >
					<Accordion.Title className="ChunkTitle" onClick={(itempProps) => this.getTakes(this.props.chunkId, itempProps)} > */
				}
					{//</Accordion.Title>

					//<Accordion.Content className="ChunkBody">
				}
						<Grid fluid columns={2}>
							<Grid.Column width={16}>
								<Grid fixed padded fluid columns={4} >


										<TakeTable
											icon={icon1}
											mode={this.props.mode}
											addToListenList={this.props.addToListenList}
											patchTake={this.props.patchTake}
											deleteTake={this.props.deleteTake}
											updateChosenTakeForChunk={
												this.props.updateChosenTakeForChunk
											}
											onClickSave={this.props.onClickSave}
											column={0}
											orderedTakes={onestar}
											chunkNumber={this.props.number}
											deleteComment={this.props.deleteComment}
											deleteButton={true}
											active={this.props.active}
											chunkId={this.props.id}
										/>




									<TakeTable
										icon={icon2}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={1}
										orderedTakes={twostar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>


									<TakeTable
										icon={icon3}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={2}
										orderedTakes={threestar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>


									<TakeTable
										height ={'25vh'}
										icon={icon4}
										icon4marker={true}
										mode={this.props.mode}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={3}
										orderedTakes={publish}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
										chunkId={this.props.id}
									/>

								</Grid>
							</Grid.Column>

						</Grid>
						<br />
					{ //</Accordion.Content>
				//</Accordion>
			}

			</div>
		);
	}
}
Chunk.propTypes = {
	chunk: ChunkPropTypes,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Chunk);
