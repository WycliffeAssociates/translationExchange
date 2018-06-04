import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from './components/ProjectCard';
import Data from './mockupdata/data.json';

class RecentProjectsContainer extends Component {
  render() {
    return (

      <Container>
        <HeaderContainer>
          <i class="far fa-clock"></i>
          <Header> Recent Projects</Header>
        </HeaderContainer>
        <CardsContainer>
          {/* need to remove the mockData and provide a valid key*/ }
          {  Data.map( (x) =>
            <ProjectCard
              key={Math.random()}
              bookName={x.book_name}
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
Container.displayName = 'Container';

const Header = styled.p`
  padding-left: 1vw;
  font-size: .9vw
`;
Header.displayName = 'Header';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5vw;
`;
HeaderContainer.displayName = 'HeaderContainer';

const CardsContainer = styled.div`
  padding-top: 2vw;
  display: flex;
  width: 82.5vw;
  flex-direction:row;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 37vw;
  overflow-y: scroll;
`;
CardsContainer.displayName = 'CardsContainer';


export default RecentProjectsContainer;
