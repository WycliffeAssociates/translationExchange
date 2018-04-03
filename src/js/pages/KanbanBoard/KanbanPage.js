import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import KanbanBoard from './components/KanbanBoard';
import {getChunks, getTakes, getComments, patchTake, addPublishedTake, saveComment, getUserHash} from '../../actions';
import UtilityPanel from '../../components/UtilityPanel';
import styled from 'styled-components';
import 'css/takes.css';
import img from '../../../assets/images/obs-en-01-01.jpg';



class KanbanPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.props.getChunks(query.chapterId);
    this.props.getComments(query.chapterId, 'chapter_id');
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

    return (
      <KanbanPageContainer>
        <NavBar chapterNum={query.chapter_num} kanban={true} {...this.props} />

        <KanbanContainer>

          <KanbanBoard {...this.props} />

          <UtilityPanel chapterNum={query.chapter_num} {...this.props} />

        </KanbanContainer>

        <SourceAudio />
      </KanbanPageContainer>
    );
  }

}

const KanbanPageContainer = styled.div`

`;

const KanbanContainer = styled.div`
 display: flex;
 height: inherit;
 width: 100vw;
 flex-direction: row;
 background: url(${img});
 background-repeat: no-repeat;
 background-size: cover;
`;
//
// const KanbanBoard = styled.div`
//   flex: 1;
//   background: url(${img})  ;
//   height: inherit;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;


const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 5vw;
  background: #2D2D2D;
  width: 100vw;
  z-index: 99;
`;

const mapDispatchToProps = dispatch => {

  return bindActionCreators({getChunks, getTakes, getComments, patchTake, addPublishedTake, saveComment, getUserHash}, dispatch);

};

const mapStateToProps = state => {
  const {takes, chunks, chunkNum, activeChunkId, publishedTakes} = state.kanbanPage;
  const {chapterComments, chunkComments, loadingComments} = state.comments;
  const {loggedInUser} = state.user;
  const {chapter = {}} =state.chunkListContainer; // TODO get chapter info from new page
  const { displayText } = state.geolocation;



  return {takes, chunks, loggedInUser, chapter, chunkNum, chapterComments, chunkComments, displayText, activeChunkId, publishedTakes};

  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(KanbanPage);
