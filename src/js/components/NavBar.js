import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import Menu, { Item as MenuItem } from 'rc-menu';
import QueryString from 'query-string';
import Dropdown from 'rc-dropdown';
import '../../css/dropdown.css';


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state ={
      displayLogOut: false,
      chunkNumSelected: props.chunkNum,
    };

    this.onLogoutMenuSelect = this.onLogoutMenuSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedInUser != this.props.loggedInUser) {
      jdenticon.update('#ActiveUser', nextProps.loggedInUser); // used in the case the user refresh the page
    }
  }

  componentWillUpdate(nextProps) {
    const {chunkNum} = nextProps;
    if (chunkNum != this.props.chunkNum) {
      this.setState({chunkNumSelected: chunkNum});
    }
  }

  componentDidMount() {
    const {loggedInUser}= this.props;
    if (loggedInUser === null) {
      this.props.getUserHash();
    }
    jdenticon.update('#ActiveUser', loggedInUser);
  }

  onLogoutMenuSelect(ky) {
    const key = ky.key;
    if (key === '0')
    {
      localStorage.removeItem('token', 'te:KanbanPage');
      this.props.removeUser();
      this.props.history.push('./welcome');
    }
    if (key === '1') {
      this.props.history.push('./progress');
    }
    if (key === '2') {
      this.props.history.push('./download');
    }
    if (key === '3') {
      this.props.history.push('./settings');
    }
  }

  onSelect({key, item}) {
    const chunkId =key;
    const {chunkNum} = item.props;
    this.setState({chunkNumSelected: chunkNum});
    this.props.getTakes(chunkId, chunkNum);
    this.props.getComments(chunkId, 'chunk_id');

    const {history, location} = this.props;
    const searchBar = QueryString.parse(location.search);

    history.push({
      pathname: './kanban',
      search: `?chapterId=${searchBar.chapterId}`+
              `&chapterNum=${searchBar.chapterNum}`+
              `&startv=${chunkNum}`+
              `&bookName=${searchBar.bookName}`+
              `&projectId=${searchBar.projectId}`+
              `&mode=${searchBar.mode}`,
    });
  }


  render() {

    const {loggedInUser, history, chunks, chapterNum, location, chapterPage, projectPage, kanbanPage, txt}= this.props;
    const searchBar = QueryString.parse(location.search);
    let menu = '';
    let book ='';
    let chapter='';
    let goToChapters = () => void(0)
    let mode = '';
    let logOutMenu = (
      <Menu onSelect={ky => this.onLogoutMenuSelect(ky)}>
        <MenuItem  style={{cursor: 'pointer', color: '#fff', backgroundColor: '#000' }} key={0}>{txt.get("logOut")}</MenuItem>
        <MenuItem  style={{cursor: 'pointer', color: '#fff', backgroundColor: '#000' }} key={1}>{txt.get("progressPage")}</MenuItem>
        <MenuItem  style={{cursor: 'pointer', color: '#fff', backgroundColor: '#000' }} key={2}>{txt.get("downloadClients")}</MenuItem>
        <MenuItem  style={{cursor: 'pointer', color: '#fff', backgroundColor: '#000' }} key={3}>{txt.get("settings")}</MenuItem>
      </Menu>
    );

    if (kanbanPage) {
      chapter =`${txt.get("chapter")} ${chapterNum}`;
      book = searchBar.bookName;
      mode = txt.get("chunk");
      goToChapters = () => {
        const {getChapters} = this.props;
        getChapters(searchBar.projectId);
        history.push({
          pathname: '/chapters',
          search: `?projectId=${searchBar.projectId}`+
                  `&bookName=${searchBar.bookName}`+
                  `&mode=${searchBar.mode}`,
        });
      };

      if (searchBar.mode === 'Verse') {
        mode = txt.get("verse");
      }

      menu = (
        <Menu style={{backgroundColor: 'rgba(255,255,255, 0.9)' }} onSelect={ ky=> this.onSelect(ky)}>
          {chunks.map(chnk=> {
            let publishedTake= chnk.published_take;
            let backgroundColor, color = '';
            backgroundColor= publishedTake ? 'rgba(0,156,255,1)': '';
            color = chnk.published_take ? 'white': '';
            return (
              <MenuItem
                style={{backgroundColor: `${backgroundColor}`, color: `${color}`}} chunkNum={chnk.startv}
                key={chnk.id}> {mode} {chnk.startv}
                <i className="material-icons"
                  style={{display: publishedTake? '': 'none', color: '#4ECf53'}}>done</i>
              </MenuItem>);})}
        </Menu>
      );

    }

    if (chapterPage) {
      book = searchBar.bookName;
    }

    return (
      <Container>
        <TextContainer>
          <Title>BTT Exchanger</Title>
        </TextContainer>
        
        <IconsContainer>
          <ProjectsButton selected={projectPage} onClick={()=> history.push('/projects')}>
            <i className="material-icons">book</i>
            <Text>{book}</Text>
          </ProjectsButton>
          <ChaptersButton selected={chapterPage} onClick={goToChapters}>
            <i className="material-icons">chrome_reader_mode</i>
            { <Text> {chapter}</Text> }
          </ChaptersButton>
          <ChunksButton selected={kanbanPage}>
            <i className="material-icons">graphic_eq</i>
            {
              kanbanPage ?
                <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  animation="slide-up"
                >
                  <Text>{mode} {this.props.chunkNum}</Text>
                </Dropdown>
                :
                ''
            }

          </ChunksButton>
        </IconsContainer>

        <IdenticonContainer>

          <Dropdown
            trigger={['click']}
            overlayClassName="logout-dropdown"
            overlay={logOutMenu}
            animation="slide-up"
          >
            <Identicon id="ActiveUser"
              data-jdenticon-hash={loggedInUser}
            />
          </Dropdown>
        </IdenticonContainer>
      </Container>
    );
  }
}




const Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 3px 4px 5px rgba(0,0,0,0.2);
  z-index: 2;
  padding: .5vw 0;

`;
Container.displayName= 'Container';
const Text = styled.p`
  cursor: pointer;
`;
Text.displayName = 'Text';

const ChaptersButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#45B649': ''}
  font-size: ${props=> props.selected ? '2vw': ''}

`;
ChaptersButton.displayName = 'ChaptersButton';

const ProjectsButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#45B649': ''}
  font-size: ${props=> props.selected ? '2vw': ''}

`;
ProjectsButton.displayName = 'ProjectsButton';

const ChunksButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#009CFF': ''}

`;
ChunksButton.displayName = 'ChunksButton';


const Identicon= styled.svg`
  width: 3.5vw;
  cursor: pointer;
`;
Identicon.displayName = 'Identicon';


const IconsContainer = styled.div`
  width 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75vw;
  text-align: center;
`;
IconsContainer.displayName = 'IconsContainer';


const Icon = styled.div`
text-align: left;
`;
Icon.displayName = 'Icon';

const IdenticonContainer = styled.div`
margin-top: 0.5vh;
margin-right: 0.5vw;
`;

IdenticonContainer.displayName = 'IdenticonContainer';


const Title = styled.p`
  font-size:1vw;
`;
Title.displayName = 'Title';


const TextContainer = styled.div`
  width: 13vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
TextContainer.displayName = 'TextContainer';

export default NavBar;
