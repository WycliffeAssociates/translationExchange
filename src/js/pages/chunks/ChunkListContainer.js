/* eslint indent: [1, "tab", {SwitchCase: 1}]*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notify } from 'react-notify-toast';
import config from '../../../config/config';
import QueryString from 'query-string';
import 'css/takes.css';
import ChunkHeader from './ChunkHeader';
import Chunk from './Chunk';
import NotFound from 'js/pages/NotFound';
import ErrorButton from '../../components/ErrorButton';
import UtilityPanel from '../../components/UtilityPanel';
import LoadingGif from '../../components/LoadingGif';
import styled from 'styled-components';
import PlayerTracker from '../../components/PlayerTracker';


import {
	addToPlaylist,
	playTake,
	stopAudio,
	getSelectedProjectInfo,
	setSourceProject,
	resetInfo,
	patchTake,
	deleteTake,
	chapterUpdate,
	deleteComment,
	markedAsPublished,
	saveComment,
	getComments,
	getAudioTakes,
	deleteTakeSuccess,
	deleteCommentSuccess,
	getSourceTakes,
	publishFiles,
} from './../../actions';

export class ChunkListContainer extends Component {

	constructor(props) {
		super(props);
		this.state ={commentsTab: true}

		this.state = {
			selectedChunk: 1,
			utililtyPanel: true,
		};

		this.createChunkList= this.createChunkList.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillUnmount() {
		this.props.resetInfo();
	}

	componentWillMount() {
		const query = QueryString.parse(this.props.location.search);
		this.props.getSelectedProjectInfo(query);
		this.props.getComments(query.chapterId, 'chapter_id');

	}

	updatingDeletedTake(takeId) {
		const tks = this.props.takes;
		this.props.deleteTakeSuccess(takeId, tks);
		this.forceUpdate();        // used to rerender when a take is delete it
	}

	handleClick(chunkId) {
		this.setState({selectedChunk: chunkId}); //set the start of the selected chunk here, and passes the selected chunk into the chunk component which is in the render function
		this.props.getComments(chunkId,'chunk_id');//  below, which in turn calls to the api to get the necessary audio takes
	}

	updatingDeletedComment(commentId, comments) {
		let commentsToUpdate =[];
		comments.map((cmt)=> {
			if (cmt.id !== commentId) {
				commentsToUpdate.push(cmt);
			}
			return null;
		});

		this.props.deleteCommentSuccess(commentId, comments);
		this.forceUpdate();        // used to rerender when a comment is delete it
	}

	notifyUnpublished() {
		let myColor = { background: '#FF0000', text: '#FFFFFF'};
		notify.show('Chapter and book unpublished', 'custom', 1800, myColor);
		this.forceUpdate();
	}

	patchTake(takeId, patch, success, chunkId) {
		const { takes, chapter, project } = this.props;
		let returnTake = null;
		let published = this.props.chapter.published;

		const chapterId = chapter.id;
		takes.map(tk => {
			if (chunkId === tk.chunkId && tk.published === true && patch.published === true) {
				returnTake = tk;
			}

			if (chunkId === tk.chunkId && tk.published && !patch.published && published) {

				this.props.markedAsPublished(this.notifyUnpublished.bind(this), chapterId, false);
				this.props.publishFiles(project.id, false); // unpublish project
			}

			return null;


		});
		if (returnTake !== null) {
			const update = {
				published: false,
				rating: 3,
			};
			this.props.patchTake(returnTake.id, update, success, takes, this.updatingDeletedTake.bind(this), chunkId);
			this.props.markedAsPublished(this.notifyUnpublished.bind(this), chapterId, false); // unpublished when you switch takes from checkmark to 3 stars
			this.props.publishFiles(chapterId, false);

		}
		this.props.patchTake(takeId, patch, success, takes, this.updatingDeletedTake.bind(this), chunkId);
	}

	/*
     Functions for making requests and updating state
     */

	deleteTake(takeId, success) {
		if (window.confirm('Delete this take?')) {
			this.props.deleteTake(takeId, success, this.updatingDeletedTake.bind(this));
		}
	}

	deleteComment(type, commentId, takeId) {
		const {chunks, chapter, takes, comments} = this.props;
		this.props.deleteComment(type, commentId, takeId, this.updatingDeletedComment.bind(this), chunks, chapter, takes, comments);
	}

	onClickSave(blobx, type, id, success) {
		const {chunks, chapter, takes} = this.props;

		this.props.saveComment(blobx, type, id, success, chunks, chapter, takes);
	}

	updateChosenTakeForChunk(takeId) {
		let updatedChunk = this.props.chunks.find(chunk => {
			return chunk.takes.find(take => take.take.id === takeId);
		});

		for (let i = 0; i < updatedChunk.takes.length; i++) {
			let currentTake = updatedChunk.takes[i];
			//if there's one besides the chosen one in the same chunk
			//that is marked is_publish, then patch it to not be marked is_publish
			if (currentTake.take.is_publish && currentTake.take.id !== takeId) {
				this.patchTake(currentTake.take.id, { is_publish: false });

			}
		}
	}

	setSourceProject(projectQuery) {
		this.props.setSourceProject(projectQuery, this.props.chapter.number);
	}

	onSourceClicked(chunkId, chunkNumber) {

		if (!this.props.playlistMode) {
			this.props.stopAudio();
			this.props.getSourceTakes(chunkId,  this.playSource.bind(this), chunkNumber);
		}
	}

	playSource(sourceLoc, chunkId, chunkNumber) {
		const date = this.parseDate(this.props.project.date_modified);
		let sourceAudio =
			{
				src: config.streamingUrl + sourceLoc,
				name: `${this.props.displayText.chunk} ${chunkNumber}, (${'author'} ${this.props.displayText.on}${date})`,
			};
		this.props.playTake(sourceAudio);

	}

	render() {



		if (this.props.loaded && this.props.chunks.length === 0) {
			return <NotFound />;
		} else if (this.props.error) {
			return (<ErrorButton error={this.props.error} />);
		} else if (!this.props.loaded) {
			return (
				<LoadingGif />
			);
		} else {

			const chapterNum = this.props.chapter.number;

			return (
				<KabanContainer className="backgroundKaban">

					<ChunkHeader
						history={this.props.history}
						chapterNum={chapterNum}
						book={this.props.book}
						chapter={this.props.chapter}
						language={this.props.language}
						chunks={this.props.chunks}
						mode={this.props.project.mode}
						selectedSourceProject={this.props.selectedSourceProjectQuery}
						onClickSave={this.onClickSave.bind(this)}
						deleteComment={this.deleteComment.bind(this)}
						setSourceProject={this.setSourceProject.bind(this)}
						active={this.props.active}
						projectId={this.props.project.id}
						displayText={this.props.displayText}
						number={this.props.chunks[this.state.selectedChunk-1].startv}
						chunkId={this.props.chunks[this.state.selectedChunk-1].id}

					/>


					<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between'}}>

						<div style={{flex: '1'}}>
							<center>
								<Chunk
									selectedChunk={this.state.selectedChunk}
									has_comments={this.props.chunks[this.state.selectedChunk-1].has_comment}
									comments={this.props.comments}
									takesForChunk={this.props.chunks[this.state.selectedChunk-1]} // array of takes
									mode={'chunks'}        //TODO get mode from backend
									number={this.props.chunks[this.state.selectedChunk-1].startv}
									chunkId={this.props.chunks[this.state.selectedChunk-1].id}
									patchTake={this.patchTake.bind(this)}
									deleteTake={this.deleteTake.bind(this)}
									updateChosenTakeForChunk={this.updateChosenTakeForChunk.bind(this)}
									onClickSave={this.onClickSave.bind(this)}
									id={this.props.chunks[this.state.selectedChunk-1].id}
									deleteComment={this.deleteComment.bind(this)}
									loaded={this.props.loaded}
									book={this.props.book.name}
									language={this.props.language.name}
									onSourceClicked={this.onSourceClicked.bind(this)}
									active={this.props.active}
									published={this.props.project.published}
									displayText={this.props.displayText}
								/>
							</center>

						</div>



						<UtilityPanel {...this.props} createChunkList = {this.createChunkList} />


					</div>


					<SourceAudio />

				</KabanContainer>
			);
		}
	}

	parseDate(dateReceived) {
		let noon = 'am';
		let dateArr = dateReceived.split('T');
		let date = dateArr[0];

		var time = dateArr[1].split('.');
		time = time[0].split(':');
		date = date.split('-');
		switch (date[1]) {
			case '01':
				date[1] = this.props.displayText.month1;
				break;
			case '02':
				date[1] = this.props.displayText.month2;
				break;
			case '0':
				date[1] = this.props.displayText.month3;
				break;
			case '04':
				date[1] = this.props.displayText.month4;
				break;
			case '05':
				date[1] = this.props.displayText.month5;
				break;
			case '06':
				date[1] = this.props.displayText.month6;
				break;
			case '07':
				date[1] = this.props.displayText.month7;
				break;
			case '08':
				date[1] = this.props.displayText.month8;
				break;
			case '09':
				date[1] = this.props.displayText.month9;
				break;
			case '10':
				date[1] = this.props.displayText.month10;
				break;
			case '11':
				date[1] = this.props.displayText.month11;
				break;
			case '12':
				date[1] = this.props.displayText.month12;
				break;
			default:
				date[1] = '';
				break;
		}

		let hour = parseInt(time[0], 10);
		if (hour / 12 > -1) {
			noon = 'pm';
		}

		if (!(hour % 12 === 0)) {
			hour %= 12;
		}
		return (`${date[1]} ${date[2]}, ${date[0]} ${this.props.displayText.at} ${hour}:${time[1]}${noon}`);
	}

	createChunkList(chunk,index) {
		console.log(chunk, 'A CHUNK LIST CONTAINER CHUNK');
		return (
			<div 	key={index} style={{marginTop: '0.5vw'}}>
				<div style={{display: 'flex', flexDirection: 'row',
					justifyContent: 'space-evenly', flex: '1', background: '#2D2D2D',
					color: this.state.selectedChunk=== chunk.id? 'white': '#969595', paddingTop: '1vw', paddingBottom: '1vw', borderBottom: 'solid 1px #969595',
					fontSize: '1.1vw', cursor: 'pointer'}} >

					<label style={{cursor: 'pointer', marginRight: '2vw', fontSize: '1vw'}}> Chunk {chunk.startv} </label>
					<label style={{cursor: 'pointer'}}> {this.state.selectedChunk === chunk.id?
						'Current': this.props.takes.map? this.props.takes.map((takes) => {
							if (takes.published == true && takes.chunkId == this.state.selectedChunk) {
								return <PlayerTracker url={takes.location} /> ;
							}

						})  : 'Unavailable'} </label>

				</div>

			</div>
		);
	}
}

const SourceAudio =  styled.div`
 	background: #2D2D2D;
	width: 100vw;
	height: 4.55vw;
	marginTop: 0vw;
	position: fixed;
	bottom: 0;
	z-index: 99;
`;

const KabanContainer =  styled.div`
	width: 100vw;
`;

const ChunkContainer= styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

`;

const PublishingLevels = styled.div`
	flex: 1;
`;

const mapStateToProps = state => {
	const { displayText = '' } = state.geolocation;
	const { direction } = state.direction;
	const { playlistMode } = state.updatePlaylist;
	const { chunkComments, chapterComments } = state.comments;

	const { selectedChunk=1, takes, loaded = false, error = '',  chunks = [], project = {}, book = {}, chapter = {}, language = {}, active = false, notifyFlag = false, selectedSourceProject = {}, selectedSourceProjectQuery = '' } = state.chunkListContainer;
	return {selectedChunk, chunkComments, chapterComments, takes, playlistMode, direction, displayText, loaded, error, chunks, project, book, chapter, language, selectedSourceProject, selectedSourceProjectQuery, active, notifyFlag };

};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addToPlaylist,
			playTake,
			stopAudio,
			getSelectedProjectInfo,
			setSourceProject,
			resetInfo,
			patchTake,
			deleteTake,
			chapterUpdate,
			deleteComment,
			markedAsPublished,
			saveComment,
			getAudioTakes,
			deleteTakeSuccess,
			deleteCommentSuccess,
			getSourceTakes,
			publishFiles,
			getComments
		}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChunkListContainer);
