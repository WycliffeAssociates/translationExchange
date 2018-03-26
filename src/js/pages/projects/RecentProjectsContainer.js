import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from './components/ProjectCard';
import Data from './mockupdata/data.json';
import img1 from './mockupdata/img1.PNG';
import img2 from './mockupdata/img1.PNG';
import img3 from './mockupdata/img1.PNG';




class RecentProjectsContainer extends Component {
  render() {
    return (

      <Container>
        <HeaderContainer>
          <i class="far fa-clock"></i>
          <Header> Recent Projects</Header>
        </HeaderContainer>
        <CardsContainer>
          {  Data.map( (x, index) =>
            <ProjectCard bookName={x.book_name}
              language={x.language}
              version={x.version}
              dateModified={x.date_modified} /> )
          }
        </CardsContainer>




      </Container>
    );
  }
}

const Container = styled.div`
  width: 98%;
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
  display: flex;
  flex-direction:row;
  justify-content: space-between;



`;


export default RecentProjectsContainer;
