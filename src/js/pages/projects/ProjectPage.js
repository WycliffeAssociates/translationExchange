import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../../components/NavBar';
import RecentProjectsContainer from './RecentProjectsContainer';
import MyProjectsContainer from './MyProjectsContainer';
import ListContainer from './ListContainer';
import { fetchAllProjects } from '../../actions';



class ProjectContainer extends Component {

    componentWillMount(){
        this.props.fetchAllProjects('');
    }

  render() {
    return (

      <Container>
        <NavBar />
        <ProjectsContainer>
          <CardsContainer>
            {/*<RecentProjectsContainer />*/}
            <MyProjectsContainer {...this.props} />
          </CardsContainer>
          <ListContainer />
        </ProjectsContainer>



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
  width: 85%
  height: 100%;
  background-color: #F6F9FE;

`;


const mapDispatchToProps = dispatch => {
    return bindActionCreators({fetchAllProjects}, dispatch);
};

const mapStateToProps = state =>{
    const { projects } = state.Projects;

    return{projects};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer);
