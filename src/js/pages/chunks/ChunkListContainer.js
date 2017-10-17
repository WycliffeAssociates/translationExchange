import React, { Component } from "react";
import axios from "axios";
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
import { addToPlaylist, playTake, stopAudio, fetchChunks, setSourceProject, resetInfo } from './../../actions';

class ChunkListContainer extends Component {
	constructor() {
		super();
		this.state = {
			listenList: [],
			currentPlaylist: [],
		};
	}

	componentWillUnmount() {
		this.props.resetInfo();

	}

	componentWillMount() {
		var query = QueryString.parse(this.props.location.search);
		this.props.fetchChunks(query);
	}

	updatingDeletedTake(takeId) {
		let updatedChunks = this.props.chunks.slice();
		let chunkToUpdate = updatedChunks.findIndex(chunk => {
			return chunk.takes.find(take => take.take.id === takeId);
		});
		updatedChunks[chunkToUpdate].takes = updatedChunks[
			chunkToUpdate
		].takes.filter(take => take.take.id !== takeId);

		this.setState({
			chunks: updatedChunks
		});
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
			this.setState({
				chunks: updatedChunks
			});
		} else if (type === "chunk") {
			for (var i = 0; i < updatedChunks.length; i++) {
				if (updatedChunks[i].id === takeId) {
					var chunkToUpdate = i;
				}
			}
			updatedChunks[chunkToUpdate].comments = updatedChunks[
				chunkToUpdate
			].comments.filter(comment => comment.comment.id !== commentId);
			this.setState({
				chunks: updatedChunks
			});
		} else if (type === "chapter") {
			let updatedChapter = Object.assign({}, this.props.chapter);

			updatedChapter.comments = updatedChapter.comments.filter(
				comment => comment.comment.id !== commentId
			);
			this.setState({
				chapter: updatedChapter
			});
		}
	}

	patchTake(takeId, patch, success) {
		axios
			.patch(config.apiUrl + "takes/" + takeId + "/", patch)
			.then(results => {
				//find the take in state that this one corresponds to
				let updatedChunks = this.props.chunks.slice();
				let chunkToUpdate = updatedChunks.findIndex(chunk => {
					return chunk.takes.find(take => take.take.id === takeId);
				});
				let takeToUpdate = updatedChunks[chunkToUpdate].takes.findIndex(
					take => take.take.id === takeId
				);
				updatedChunks[chunkToUpdate].takes[takeToUpdate].take = results.data;

				this.setState(
					{
						chunks: updatedChunks
					},
					() => {
						if (success) {
							success(updatedChunks[chunkToUpdate].takes[takeToUpdate].take);
						}
					}
				);
			})
			.catch(exception => {
				if (exception.response) {
					if (exception.response.status === 404) {
						alert("Sorry, that take doesn't exist!");
						this.updatingDeletedTake(takeId);
					} else {
						alert(
							"Something went wrong. Please check your connection and try again. "
						);
					}
				} else {
					//timeout error doesn't produce response
					alert(
						"Something went wrong. Please check your connection and try again. "
					);
				}
			});
	}

	/*
     Functions for making requests and updating state
     */

	deleteTake(takeId, success) {
		if (window.confirm("Delete this take?")) {
			axios
				.delete(config.apiUrl + "takes/" + takeId + "/")
				.then(results => {
					this.updatingDeletedTake(takeId);
					if (success) {
						success();
					}
				})
				.catch(exception => {
					if (exception.response) {
						if (exception.response.status === 404) {
							this.updatingDeletedTake(takeId);
						} else {
							alert(
								"Something went wrong. Please check your connection and try again. "
							);
						}
					} else {
						//timeout error doesn't produce response
						alert(
							"Something went wrong. Please check your connection and try again. "
						);
					}
				});
		}
	}

	deleteComment(type, commentId, takeId) {
		axios
			.delete(config.apiUrl + "comments/" + commentId + "/")
			.then(results => {
				this.updatingDeletedComment(type, commentId, takeId);
			})
			.catch(exception => {
				if (exception.response) {
					if (exception.response.status === 404) {
						this.updatingDeletedComment(type, commentId, takeId);
					} else {
						alert(
							"Something went wrong. Please check your connection and try again."
						);
					}
				} else {
					//timeout error doesn't produce response
					alert(
						"Something went wrong. Please check your connection and try again."
					);
				}
			});
	}

	onClickSave(blobx, type, id, success) {
		this.setState({
			active: true
		});
		axios
			.post(config.apiUrl + "comments/", {
				comment: blobx,
				user: 3,
				object: id,
				type: type
			})
			.then(results => {
				var map = { comment: results.data };
				let updatedChunks = this.props.chunks.slice();

				if (type === "take") {
					let chunkToUpdate = updatedChunks.findIndex(chunk => {
						return chunk.takes.find(take => take.take.id === id);
					});
					let takeToUpdate = updatedChunks[chunkToUpdate].takes.findIndex(
						take => take.take.id === id
					);
					updatedChunks[chunkToUpdate].takes[takeToUpdate].comments.push(map);
					this.setState({
						chunks: updatedChunks,
						active: false
					});
				} else if (type === "chunk") {
					for (var i = 0; i < updatedChunks.length; i++) {
						if (updatedChunks[i].id === id) {
							var chunkToUpdate = i;
						}
					}
					updatedChunks[chunkToUpdate].comments.push(map);
					this.setState({
						chunks: updatedChunks,
						active: false
					});
				} else {
					let updatedChapter = Object.assign({}, this.props.chapter);
					updatedChapter.comments.push(map);
					this.setState({
						chapter: updatedChapter,
						active: false
					});
				}
				success();
			})
			.catch(exception => {
				alert(
					"Something went wrong. Please check your connection and try again."
				);
				success();
				this.setState({
					active: false
				});
			});
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
		let parameters = { is_publish: true };
		//make patch request to confirm that the chapter is ready to be published
		axios
			.patch(
			config.apiUrl + "chapters/" + this.props.chapter.id + "/",
			parameters
			)
			.then(response => {
				let updatedChapter = Object.assign({}, this.props.chapter);
				updatedChapter.is_publish = true;
				this.setState({ chapter: updatedChapter });
				if (success) {
					success();
				}
			})
			.catch(exception => {
				console.log(exception);
			});
	}

	setSourceProject(projectQuery) {
		this.props.setSourceProject(projectQuery, this.props.chapter.number);
	}

	addToListenList(props) {

		var newArr = this.state.listenList;
		var id = props.take.id;

		for (let i = 0; i < newArr.length; i++) {

			if (newArr[i].props.take.id === id) {
				newArr.splice(i, 1);
				this.setState({ listenList: newArr });
				return "";
			}
		}

		//find the chunk that this take was from, and add chunk info
		let chunk = this.props.chunks.find(chunk => {
			return chunk.takes.find(take => take.take.id === id);
		});
		let newListenItem = {
			props: props,
			chunk: chunk,
			count: props.count,
			mode: props.mode
		};

		newArr.push(newListenItem);
		this.setState({
			listenList: newArr
		});

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
		/*
        segments is an array of takes for each chunk
         */
		return (
			<div>
				<Chunk
					comments={chunk.comments}
					segments={chunk.takes} // array of takes
					mode={this.props.project.mode}
					number={chunk.startv}
					addToListenList={this.addToListenList.bind(this)}
					patchTake={this.patchTake.bind(this)}
					deleteTake={this.deleteTake.bind(this)}
					updateChosenTakeForChunk={this.updateChosenTakeForChunk.bind(this)}
					onClickSave={this.onClickSave.bind(this)}
					id={chunk.id}
					deleteComment={this.deleteComment.bind(this)}
					loaded={this.props.loaded}
					book={this.props.book.name}
					language={this.props.language.name}
					chunks={this.props.chunks}
					listenList={this.state.listenList}
					onSourceClicked={this.onSourceClicked.bind(this)}
					active={this.props.active}
					displayText={this.props.displayText}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { displayText = "" } = state.geolocation;
	const { direction } = state.direction;
	const { playlistMode } = state.updatePlaylist;
	const { loaded = false, error = "", chunks = [], project = {}, book = {}, chapter = {}, language = {}, active = false, selectedSourceProject = {}, selectedSourceProjectQuery = "" } = state.chunkListContainer;
	return { playlistMode, direction, displayText, loaded, error, chunks, project, book, chapter, language };

}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addToPlaylist,
			playTake,
			stopAudio,
			fetchChunks,
			setSourceProject,
			resetInfo
		}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChunkListContainer);
