import React, {Component} from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import RecentProjectsContainer from './RecentProjectsContainer';
import MyProjectsContainer from './MyProjectsContainer';
import ListContainer from './ListContainer';



class ProjectContainer extends Component {
  render() {
    return (

      <Container>
        <NavBar />
        <ProjectsContainer>
          <CardsContainer>
            <RecentProjectsContainer />
            <MyProjectsContainer />
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


export default ProjectContainer;
