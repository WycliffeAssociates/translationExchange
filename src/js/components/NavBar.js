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

  logOut() {
    localStorage.removeItem('token');
    this.props.removeUser();
    this.props.history.push('./welcome');
  }

  onSelect({key, item}) {
    const chunkId =key;
    const {chunkNum} = item.props;
    this.setState({chunkNumSelected: chunkNum});
    this.props.getTakes(chunkId, chunkNum);
    this.props.getComments(chunkId, 'chunk_id');
  }


  render() {

    const {loggedInUser, history, chunks, chapterNum, location, chapterPage, projectPage, kanbanPage, txt}= this.props;
    const searchBar = QueryString.parse(location.search);
    let menu = '';
    let book ='';
    let chapter='';
    let goToChapters = '';
    let mode = '';
    let logOutMenu = (
      <Menu onSelect={ ()=> this.logOut()}>
        <MenuItem style={{cursor: 'pointer', color:'#fff', backgroundColor:'#000' }} key="1">{txt.logOut}</MenuItem>
      </Menu>
    );

    if (kanbanPage) {
      chapter =`${txt.chapter} ${chapterNum}`;
      book = searchBar.bookName;
      mode = txt.chunk;
      goToChapters = () => {
        const {getChapters} = this.props;
        getChapters(searchBar.projectId);
        history.push(`/chapters?projectId=${searchBar.projectId}&&bookName=${searchBar.bookName}&&mode=${searchBar.mode}`);
      };

      if (searchBar.mode === 'Verse') {
        mode = txt.verse;
      }

      menu = (
        <Menu style={{backgroundColor: 'rgba(255,255,255, 0.9)' }} onSelect={ ky=> this.onSelect(ky)}>
          {chunks.map(chnk=> {
            let backgroundColor, color = '';
            backgroundColor= chnk.published_take ? 'rgb(0,156,255,0.6)': '';
            color = chnk.published_take ? 'white': '';
            return (
              <MenuItem style={{backgroundColor: `${backgroundColor}`, color: `${color}`}} chunkNum={chnk.startv} key={chnk.id}> {mode} {chnk.startv}</MenuItem>)})}
        </Menu>
      );

    }

    if (chapterPage) {
      book = searchBar.bookName;
    }

    return (
      <Container>
        <TextContainer>
          <Title>Translation Exchange </Title>
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
            <i class="material-icons">graphic_eq</i>

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 3px 4px 5px rgba(0,0,0,0.2);
  z-index: 2;
  min-height: 90px;
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
  height: 10vh;
  width: 5vw;
  cursor: pointer;
`;
Identicon.displayName = 'Identicon';


<<<<<<< HEAD
const LogOut = styled.div`
  visibility: ${props=> props.display ? 'visible' : 'hidden'};
  width: 7.5vw;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  position: absolute;
  z-index: 1;
  margin-left: -2.5vw;
  cursor: pointer;
  &:hover{
    visibility: visible;
  }
`;
LogOut.displayName = 'LogOut';


const DropdownLogOut = styled.div`
  display: block;
  &:hover(:first-child) {
    display: block;
  }
`;
DropdownLogOut.displayName = 'DropdownLogOut';


const List = styled.ul`
display: none;
`;
List.displayName = 'List';


=======
>>>>>>> dev
const IconsContainer = styled.div`
  width 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75vw;
  text-align: center;
`;
IconsContainer.displayName = 'IconsContainer';


<<<<<<< HEAD
const Icon = styled.div`
text-align: left;
`;
Icon.displayName = 'Icon';


=======
>>>>>>> dev
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
