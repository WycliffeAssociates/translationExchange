import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from './components/ProjectCard';
import Data from './mockupdata/data.json';
import img1 from './mockupdata/img1.PNG';
import img2 from './mockupdata/img1.PNG';
import img3 from './mockupdata/img1.PNG';




class MyProjectsContainer extends Component {
  render() {
      const {projects} = this.props;
    return (

      <Container>
        <HeaderContainer>
            <i class="material-icons">folder_shared</i>
          <Header>Projects</Header>
        </HeaderContainer>
        <CardsContainer>
          { projects.map( (p, index) =>
            <ProjectCard
              index={index}
              bookName={p.book.name}
              language={p.language.name}
              version={p.version.slug}
              dateModified={p.date_modified.slice(0,10)}
              projectId={p.id}
             {...this.props}
            /> )
          }
        </CardsContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height:100%;
  display: flex;
  flex-direction: column;
  padding-top:3vw;
  padding-left: 1vw;
 
`;

const Header = styled.p`
  padding-left: 1vw;
  font-size: .9vw

`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5vw;
`;

const CardsContainer = styled.div`
padding-top: 2vw;
width: 100%;
height: 100%;
display: flex;
flex-direction:row;
flex-wrap: wrap;
align-items: left;

`;


export default MyProjectsContainer;
