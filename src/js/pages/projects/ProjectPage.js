import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import Loading from '../../components/Loading';
import RecentProjectsContainer from './RecentProjectsContainer';
import MyProjectsContainer from './MyProjectsContainer';
import { fetchAllProjects, getChapters, getUserHash, removeUser, updateLanguage } from '../../actions';



class ProjectContainer extends Component {

  componentWillMount() {
    const {history, fetchAllProjects, updateLanguage} = this.props;
    fetchAllProjects('', history ); // use history for redirect to the error page
    const language = localStorage.getItem('language');
    if (language) {
      updateLanguage(language);
    }
  
  }

  render() {
    return (
      <Container>
        <NavBar projectPage={true} {...this.props} />

        {  this.props.loading?

          <Loading txt={this.props.txt} height= {'auto'} />

          :

          <ProjectsContainer>
            <CardsContainer>
              {/*<RecentProjectsContainer />*/}
              <MyProjectsContainer {...this.props} />
            </CardsContainer>
          </ProjectsContainer>


        }

      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height:100vh;
  display: flex;
  flex-direction: column;

`;

const ProjectsContainer = styled.div`
  width: 100%;
  height:90vh;
  display: flex;
  flex-direction: row;
  overflow-y:scroll;

`;


const CardsContainer = styled.div`
  width: 100%
  height: 100%;
  background-color: #F6F9FE;

`;


const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchAllProjects, getChapters, getUserHash, removeUser, updateLanguage}, dispatch);
};

const mapStateToProps = state =>{
  const { projects, loading  } = state.Projects;
  const {loggedInUser} = state.user;
  const {txt} = state.geolocation;

  return {projects, loggedInUser, loading, txt};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
