/* eslint indent: [0, "tab"] */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import {bindActionCreators} from 'redux';
import { getAudioTakes, getChunkIdClicked } from './../../actions';
import 'css/takes.css';

class ChunkHeader extends Component {

		constructor(props) {
			super(props);

			this.getTakes = this.getTakes.bind(this);


		}

		componentDidMount() {
			this.getTakes(this.props.chunkId);
		}

		componentDidUpdate() {
			this.getTakes(this.props.chunkId);

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
		//const has_comments = this.props.chapter.has_comment;
		console.log(this.props, 'CHUNK HEADER PROPS');
		return (
			<div>
				<NavBar chunks ={this.props.chunks} {...this.props} getTakes={this.getTakes} />
			</div>
		);
	}
}


//
// const mapStateToProps = state => {
// 	const { takes, loaded = false, error = '', comments = [], chunks = [], project = {}, book = {}, chapter = {}, language = {}, active = false, notifyFlag = false, selectedSourceProject = {}, selectedSourceProjectQuery = '' } = state.chunkListContainer;
// 	return {comments, takes, loaded, error, chunks, project, book, chapter, language, selectedSourceProject, selectedSourceProjectQuery, active, notifyFlag };
// 	};


	const mapDispatchToProps = dispatch => {
		return bindActionCreators(
			{
				getAudioTakes,
				getChunkIdClicked,
			}, dispatch);
	};


export default connect(null, mapDispatchToProps)(ChunkHeader);
