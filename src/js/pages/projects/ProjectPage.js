import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import RecentProjectsContainer from './RecentProjectsContainer';
import MyProjectsContainer from './MyProjectsContainer';
import ListContainer from './ListContainer';
import { fetchAllProjects, getChapters, getUserHash, removeUser } from '../../actions';



class ProjectContainer extends Component {

  componentWillMount() {
    this.props.fetchAllProjects('');
  }

  render() {
    return (
      <Container>
        <NavBar projectPage={true} {...this.props} />

        {  this.props.loading?

          <Loading height= {'auto'} />

          :

          <ProjectsContainer>
            <CardsContainer>
              {/*<RecentProjectsContainer />*/}
              <MyProjectsContainer {...this.props} />
            </CardsContainer>
            {/*<ListContainer />*/}
          </ProjectsContainer>


        }

      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

`;


const CardsContainer = styled.div`
  width: 100%
  height: 100%;
  background-color: #F6F9FE;

`;


const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAllProjects, getChapters, getUserHash, removeUser}, dispatch);
};

const mapStateToProps = state =>{
  const { projects, loading  } = state.Projects;
  const {loggedInUser} = state.user;

  return {projects, loggedInUser, loading};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
