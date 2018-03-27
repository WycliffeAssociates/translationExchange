import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import KanbanBoard from './components/KanbanBoard';
import {getChunks, getTakes, getComments} from '../../actions';
import UtilityPanel from '../../components/UtilityPanel';
import styled from 'styled-components';


class ComponentName extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.props.getChunks(query.chapterId);
    this.props.getComments(query.chapterId, 'chapter_id');
  }


  render() {
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    return (
      <KanbanPageContainer>
        <NavBar chapterNum={query.chapter_num} kanban={true} {...this.props} />


        <KanbanContainer>

          <KanbanBoard />
          <UtilityPanel chapterNum={query.chapter_num} {...this.props} createChunkList = {this.createChunkList} />


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


const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 5vw;
  background: #2D2D2D;
  width: 100vw;
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getChunks, getTakes, getComments}, dispatch)
}

const mapStateToProps = state => {
  const {takes, chunks, chunkNum} = state.kanbanPage;
  const {chapterComments, chunkComments} = state.comments;
  const {loggedInUser} = state.user;
  const {chapter = {}} =state.chunkListContainer; // TODO get chapter info from new page

  return {takes, chunks, loggedInUser, chapter, chunkNum, chapterComments, chunkComments}
  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(ComponentName);
