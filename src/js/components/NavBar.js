import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import Menu, { Item as MenuItem } from 'rc-menu';
import QueryString from 'query-string';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';


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

    const {loggedInUser, history, chunks, chapterNum, location, chapterPage, projectPage, kanbanPage}= this.props;
    const searchBar = QueryString.parse(location.search);
    let menu = '';
    let book ='';
    let chapter='';
    let goToChapters = '';
    let logOutMenu = (
      <Menu onSelect={ ()=> this.logOut()}>
        <MenuItem style={{cursor:'pointer', color:'#fff', backgroundColor:'#000' }} key="1">Log Out</MenuItem>
      </Menu>
    );

    if (kanbanPage) {
      chapter =`Chapter ${chapterNum}`;
      book = searchBar.bookName;
      goToChapters = () => {
        const {getChapters} = this.props;
        getChapters(searchBar.projectId);
        history.push(`/chapters?projectId=${searchBar.projectId}&&bookName=${searchBar.bookName}`);
      };

      menu = (
        <Menu onSelect={ ky=> this.onSelect(ky)}>
          { kanbanPage ? chunks.map(chnk=><MenuItem chunkNum={chnk.startv} key={chnk.id}> Chunk {chnk.startv}</MenuItem>): ''}
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
                  <Text>Chunk {this.props.chunkNum}</Text>
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
const Text = styled.p`
  cursor: pointer;
`;

const ChaptersButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#45B649': ''}
  font-size: ${props=> props.selected ? '2vw': ''}
  
`;

const ProjectsButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#45B649': ''}
  font-size: ${props=> props.selected ? '2vw': ''}
  
`;

const ChunksButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#009CFF': ''}
  
`;

const Identicon= styled.svg`
  height: 10vh;
  width: 5vw;
  cursor: pointer;
`;

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

const DropdownLogOut = styled.div`
  display: block;
  &:hover(:first-child) {
    display: block;
  }
`;

const List = styled.ul`
display: none;
`;

const IconsContainer = styled.div`
  width 30vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75vw;
  text-align: center;
`;

const Icon = styled.div`
text-align: left;
`;

const IdenticonContainer = styled.div`
margin-top: 0.5vh;
margin-right: 0.5vw;

`;

const Title = styled.p`
  font-size:1vw;
`;

const TextContainer = styled.div`
  width: 13vw;
  display: flex;
  justify-content: center;
  align-items: center;

`;


export default NavBar;
