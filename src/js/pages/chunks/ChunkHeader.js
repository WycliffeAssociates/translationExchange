/* eslint indent: [0, "tab"] */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import {bindActionCreators} from 'redux';
import { getAudioTakes, getChunkIdClicked } from './../../actions';
import 'css/takes.css';

class ChunkHeader extends Component {

	render() {

		return (
			<div>
				<NavBar { ...this.props } />
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
