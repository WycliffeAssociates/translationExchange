import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import getIllustrations from '../../../js/getIllustrations';
import KanbanBoard from './components/KanbanBoard';
import {getChunks, getTakes,deleteTake, getComments,
  patchTake, patchChapter, saveComment, getUserHash,
  removeUser, getChapters, resetError,
  deleteComment, playTake,
  addTakeToDelete, removeTakeToDelete, updateTake} from '../../actions';
import UtilityPanel from './components/UtilityPanel/UtilityPanel';
import styled from 'styled-components';
import '../../../css/takes.css';

export class KanbanPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      illustrations: null,
    };
  }

  componentWillMount() {
    const {getComments, getChunks, takes, history} = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    
    getChunks(query.chapterId, query.startv, history);
    getComments(query.chapterId, 'chapter_id');

    let illustrations = getIllustrations(this.props.project);
    this.setState({illustrations: illustrations});
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.location != this.props.location) {
      return true;
    }

    if (nextProps) {
      return true;
    }
  }


  render() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    const {illustrations} = this.state;

    return (
      <KanbanPageContainer>
        <NavBar chapterNum={query.chapterNum} kanbanPage={true} {...this.props} />

        <KanbanContainer sketch ={illustrations.sketch}>

          <KanbanBoard {...this.props} />

          <UtilityPanel chapterNum={query.chapterNum} {...this.props} />

        </KanbanContainer>
        <SourceAudio />
      </KanbanPageContainer>
    );
  }

}

const KanbanPageContainer = styled.div`
overflow-x: hidden;
overflow-y: auto;
width: 100%;
box-sizing: border-box;
`;
KanbanPageContainer.displayName = 'KanbanPageContainer';

const KanbanContainer = styled.div`
 display: flex;
 height: 90vh ;
 width: 100vw;
 flex-direction: row;
 background: url(${props=> props.sketch});
 background-repeat: no-repeat;
 background-size: cover;
 overflow-x: hidden;
 overflow-y: auto;
 box-sizing: border-box;
`;
KanbanContainer.displayName = 'KanbanContainer';

const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 7.5vh;
  background: #2D2D2D;
  width: 100vw;
  z-index: 10;
  max-height: 50px;
`;
SourceAudio.displayName = 'SourceAudio';

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getChunks, getTakes,deleteTake,
    getComments, patchTake, patchChapter, saveComment, getUserHash, removeUser,
    getChapters, resetError, deleteComment,playTake,
    addTakeToDelete,removeTakeToDelete, updateTake}, dispatch);

};

const mapStateToProps = state => {
  const {takes, chunks, chunkNum, activeChunkId, playingTakeId, takesToDelete,
    removedTaketoDelete, project} = state.kanbanPage;
  const {chapterComments, chunkComments, uploadingComments,  uploadError} = state.comments;
  const {chapters} = state.Chapters;
  const {loggedInUser} = state.user;
  const { txt } = state.geolocation;



  return {takes, chunks, loggedInUser, chunkNum, chapterComments, chunkComments,
    txt, activeChunkId, uploadingComments, uploadError, chapters, playingTakeId,
    takesToDelete, removedTaketoDelete, project};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(KanbanPage);
