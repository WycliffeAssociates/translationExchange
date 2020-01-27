import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from './components/ProjectCard';
import ExportModal from './components/ExportModal';
import ImportProject from './components/ImportProject/';
import AddFile from './components/ImportProject/AddFile';


class MyProjectsContainer extends Component {
  render() {
    const {projects, txt, setProject, importProject,history} = this.props;
    return (

      <Container>
        <HeaderContainer>
          <Header>  <i className="material-icons">folder_shared</i>{txt.get("projects")}</Header>
          <div style={{alignSelf: 'flexEnd'}} >
            {projects.length >0 ?
              <AddFile txt={txt} importProject={importProject}
                history={history} /> :
              ''
            }
          </div>
        </HeaderContainer>
        <CardsContainer>
          {
            projects.length >0 ?
              projects.map( (p, index) =>
                <ProjectCard
                  key={p.id}
                  index={index}
                  bookName={p.book.name}
                  slug={p.book.slug}
                  language={p.language.name}
                  version={p.version.slug}
                  dateModified={p.date_modified ? p.date_modified.slice(0,10) : ''}
                  projectId={p.id}
                  mode={p.mode.name}
                  setProject ={setProject}
                  {...this.props}
                /> )
              :
              <ImportProject importProject={importProject}
                history={history} txt={txt} />
          }
        </CardsContainer>
        <ExportModal {...this.props} />
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
  justify-content: space-between;
  font-size: 1.5vw;
`;
HeaderContainer.displayName = 'HeaderContainer';

const CardsContainer = styled.div`
padding-top: 2vw;
width: 100%;
height: 100%;
display: flex;
flex-direction:row;
flex-wrap: wrap;
align-items: left;
`;
CardsContainer.displayName = 'CardsContainer';


export default MyProjectsContainer;
