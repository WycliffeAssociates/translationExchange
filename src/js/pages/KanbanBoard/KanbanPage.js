import React from 'react';
import {connect} from 'react-redux';
import NavBar from '../../components/NavBar';
import KanbanBoard from './components/KanbanBoard';
//import UtilityPanel from '../../components/UtilityPanel';
import styled from 'styled-components';
import {bindActionCreators} from 'redux';

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

class ComponentName extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div>
        <NavBar />


        <KanbanContainer>

          <KanbanBoard  {...this.props} />
          <UtilityPanel />

        </KanbanContainer>



        <SourceAudio />
      </div>
    );
  }

}

const KanbanContainer = styled.div`
 display: flex;
 flex-direction: row;
 height: 90vh;
 width: 100vw;
`;
//
// const KanbanBoard = styled.div`
//   flex: 1;
//   background: url(${img})  ;
//   height: inherit;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

const UtilityPanel = styled.div`
  background: #2D2D2D;
  //height: 100vh;
  flex: 0.18;
`;

const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 5vw;
  background: #2D2D2D;
  width: 100vw;
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
      getComments,
    }, dispatch);
};



export default connect(mapStateToProps,mapDispatchToProps)(ComponentName);
