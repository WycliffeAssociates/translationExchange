import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import QueryString from 'query-string';
import NavBar from '../../components/NavBar';
import KanbanBoard from './components/KanbanBoard';
import {getChunks, getAudioTakes} from '../../actions';
//import UtilityPanel from '../../components/UtilityPanel';
import styled from 'styled-components';


class ComponentName extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const t = this.props;
    const {search} = this.props.location;
    const query = QueryString.parse(search);
    this.props.getChunks(query.chapterId);
  }


  render() {

    return (
      <KanbanPageContainer>
        <NavBar kanban={true} {...this.props} />


        <KanbanContainer>

          <KanbanBoard />
          <UtilityPanel />

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

const UtilityPanel = styled.div`
  background: #2D2D2D;
  //height: 100vh;
  width: 15vw;
`;

const SourceAudio = styled.div`
  position: fixed;
  bottom: 0;
  height: 5vw;
  background: #2D2D2D;
  width: 100vw;
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators({getChunks, getAudioTakes}, dispatch) // add actions
}

const mapStateToProps = state => {
  const {takes, chunks} = state.kanbanPage;
  const {loggedInUser} = state.user;

  return {takes, chunks, loggedInUser}
  // all the state variables that you want to map to props
};


export default connect(mapStateToProps,mapDispatchToProps)(ComponentName);
