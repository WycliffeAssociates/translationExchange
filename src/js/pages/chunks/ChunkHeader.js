/* eslint indent: [0, "tab"] */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import jdenticon from 'jdenticon';
import NavBar from '../../components/NavBar';
import ExportTakesButton from '../takes/components/ExportTakesButton';
import SetSourceAudio from '../takes/components/SetSourceAudio';
import RecordButton from '../takes/components/comments/RecordButton';
import { Grid } from 'semantic-ui-react';
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



const mapStateToProps = state => {
	const { takes, loaded = false, error = '', comments = [], chunks = [], project = {}, book = {}, chapter = {}, language = {}, active = false, notifyFlag = false, selectedSourceProject = {}, selectedSourceProjectQuery = '' } = state.chunkListContainer;
	return {comments, takes, loaded, error, chunks, project, book, chapter, language, selectedSourceProject, selectedSourceProjectQuery, active, notifyFlag };
	};
export default connect(mapStateToProps)(ChunkHeader);
