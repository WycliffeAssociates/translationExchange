import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import config from "../../../config/config";
import QueryString from "query-string";
import "css/takes.css";
import ChunkHeader from "./ChunkHeader";
import Footer from "../takes/components/Footer";
import Chunk from "./Chunk";
import NotFound from "js/pages/NotFound";
import ErrorButton from '../../components/ErrorBytton';
import LoadingGif from '../../components/LoadingGif';


import {
	addToPlaylist,
	playTake,
	stopAudio,
	getSelectedProjectInfo,
	setSourceProject,
	resetInfo,
	patchTake,
	updateDeletedChunk,
	deleteTake,
	chapterUpdate,
	deleteComment,
	markedAsPublished,
	saveComment
} from './../../actions';

class ChunkListContainer extends Component {
	componentWillUnmount() {
		this.props.resetInfo();
	}

	componentWillMount() {
		var query = QueryString.parse(this.props.location.search);
		//this.props.fetchChunks(query);
		this.props.getSelectedProjectInfo(query);
	}

	updatingDeletedTake(takeId) {
		let updatedChunks = this.props.chunks.slice();
		let chunkToUpdate = updatedChunks.findIndex(chunk => {
			return chunk.takes.find(take => take.take.id === takeId);
		});
		updatedChunks[chunkToUpdate].takes = updatedChunks[
			chunkToUpdate
		].takes.filter(take => take.take.id !== takeId);
		this.props.updateDeletedChunk(updatedChunks);
	}

	updatingDeletedComment(type, commentId, takeId) {
		let updatedChunks = this.props.chunks.slice();
		if (type === "take") {
			let chunkToUpdate = updatedChunks.findIndex(chunk => {
				return chunk.takes.find(take => take.take.id === takeId);
			});
			let takeToUpdate = updatedChunks[chunkToUpdate].takes.findIndex(
				take => take.take.id === takeId
			);

			updatedChunks[chunkToUpdate].takes[takeToUpdate].comments = updatedChunks[
				chunkToUpdate
			].takes[takeToUpdate].comments.filter(
				comment => comment.comment.id !== commentId
				);
			this.props.updateDeletedChunk(updatedChunks);
		} else if (type === "chunk") {
			for (var i = 0; i < updatedChunks.length; i++) {
				if (updatedChunks[i].id === takeId) {
					var chunkToUpdate = i;
				}
			}
			updatedChunks[chunkToUpdate].comments = updatedChunks[
				chunkToUpdate
			].comments.filter(comment => comment.comment.id !== commentId);
			this.props.updateDeletedChunk(updatedChunks);
		} else if (type === "chapter") {
			let updatedChapter = Object.assign({}, this.props.chapter);

			updatedChapter.comments = updatedChapter.comments.filter(
				comment => comment.comment.id !== commentId
			);
			this.props.chapterUpdate(updatedChapter);
		}
	}

	patchTake(takeId, patch, success) {
		this.props.patchTake(takeId, patch, success, this.props.chunks, this.updatingDeletedTake.bind(this));
	}

	/*
     Functions for making requests and updating state
     */

	deleteTake(takeId, success) {
		if (window.confirm("Delete this take?")) {
			this.props.deleteTake(takeId, success, this.updatingDeletedTake.bind(this));
		}
	}

	deleteComment(type, commentId, takeId) {
		this.props.deleteComment(type, commentId, takeId, this.updatingDeletedComment.bind(this));
	}

	onClickSave(blobx, type, id, success) {
		this.props.saveComment(blobx, type, id, success, this.props.chunks, this.props.chapter);
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

	onMarkedAsPublish(success) {
		/**
		 * TODO : needs server implementation and get clear requirement
		 */
		this.props.markedAsPublish(success, this.props.chapter);
		// //make patch request to confirm that the chapter is ready to be published

		// let parameters = { is_publish: true };
		// axios
		// 	.patch(
		// 	config.apiUrl + "chapters/" + this.props.chapter.id + "/",
		// 	parameters
		// 	)
		// 	.then(response => {
		// 		let updatedChapter = Object.assign({}, this.props.chapter);
		// 		updatedChapter.is_publish = true;
		// 		this.setState({ chapter: updatedChapter });
		// 		if (success) {
		// 			success();
		// 		}
		// 	})
		// 	.catch(exception => {
		// 		console.log(exception);
		// 	});
	}

	setSourceProject(projectQuery) {
		this.props.setSourceProject(projectQuery, this.props.chapter.number);
	}

	getSourceAudioLocationForChunk(startv) {
		if (!this.props.selectedSourceProject) {
			return undefined;
		}
		let chunk = this.props.selectedSourceProject.chunks.find(
			chunk => chunk.startv === startv
		);
		let take = chunk.takes.find(take => take.take.is_publish);
		return take.take.location;
	}

	onSourceClicked(startv) {
		if (!this.props.playlistMode) {
			this.props.stopAudio();
			let sourceLoc = this.getSourceAudioLocationForChunk(startv);

			let sourceAudio =
				{
					src: config.streamingUrl + sourceLoc,
					name: this.props.project.mode + " " + startv + " (source)"
				};
			this.props.playTake(sourceAudio);
		}
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
			return (
				<div style={{ direction: `${this.props.direction}` }}>
					<ChunkHeader
						book={this.props.book}
						chapter={this.props.chapter}
						language={this.props.language.name}
						chunks={this.props.chunks}
						mode={this.props.project.mode}
						selectedSourceProject={this.props.selectedSourceProjectQuery}
						onClickSave={this.onClickSave.bind(this)}
						deleteComment={this.deleteComment.bind(this)}
						setSourceProject={this.setSourceProject.bind(this)}
						onMarkedAsPublish={this.onMarkedAsPublish.bind(this)}
						active={this.props.active}
						projectId={this.props.project.id}
						displayText={this.props.displayText}
					/>

					{this.props.chunks.map(this.createChunkList.bind(this))}

					<div fluid className="StickyFooter">
						<Footer />
					</div>
				</div>
			);
		}
	}

	createChunkList(chunk) {
		/**
		 * TODO: discuss if the empty list be show or not(Chunks without takes)
		 */
		//	if (chunk.takes.length > 0) {
		return (
			<div>
				<Chunk
					comments={chunk.comments}
					takesForChunk={chunk.takes} // array of takes
					mode={this.props.project.mode}
					number={chunk.startv}
					patchTake={this.patchTake.bind(this)}
					deleteTake={this.deleteTake.bind(this)}
					updateChosenTakeForChunk={this.updateChosenTakeForChunk.bind(this)}
					onClickSave={this.onClickSave.bind(this)}
					id={chunk.id}
					deleteComment={this.deleteComment.bind(this)}
					loaded={this.props.loaded}
					book={this.props.book.name}
					language={this.props.language.name}
					onSourceClicked={this.onSourceClicked.bind(this)}
					active={this.props.active}
					displayText={this.props.displayText}
				/>
			</div>
		);
		//	}
	}
}

const mapStateToProps = state => {
	const { displayText = "" } = state.geolocation;
	const { direction } = state.direction;
	const { playlistMode } = state.updatePlaylist;
	const { loaded = false, error = "", chunks = [], project = {}, book = {}, chapter = {}, language = {}, active = false, notifyFlag = false, selectedSourceProject = {}, selectedSourceProjectQuery = "" } = state.chunkListContainer;
	return { playlistMode, direction, displayText, loaded, error, chunks, project, book, chapter, language, selectedSourceProject, selectedSourceProjectQuery, active, notifyFlag };

}

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
			updateDeletedChunk,
			deleteTake,
			chapterUpdate,
			deleteComment,
			markedAsPublished,
			saveComment
		}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChunkListContainer);
