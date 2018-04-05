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
    this.props.history.push('./welcome');
  }

  hiddeLogOut() {
    setTimeout(()=> this.setState({displayLogOut: false}) , 1500);
  }

  onSelect({key, item}) {
    const chunkId =key;
    const {chunkNum} = item.props;
    this.setState({chunkNumSelected: chunkNum});
    this.props.getTakes(chunkId, chunkNum);
    this.props.getComments(chunkId, 'chunk_id');
  }

  onVisibleChange(visible) {
    console.log(visible);
  }

  render() {

    const {loggedInUser, history, chunks, chapterNum, location, kanban}= this.props;
    let searchBar=''
    let menu = '';
    if (kanban) {
      searchBar = QueryString.parse(location.search);
      menu = (
        <Menu onSelect={ ky=> this.onSelect(ky)}>
          { kanban ? chunks.map(chnk=><MenuItem chunkNum={chnk.startv} key={chnk.id}> Chunk {chnk.startv}</MenuItem>): ''}
        </Menu>
      );
    }

    return (
      <Container>
        <TextContainer>
          <Title>Translation Exchange </Title>
        </TextContainer>
        <IconsContainer>
          <TextIconContainer onClick={()=> history.push('/projects')}>
            <i class="material-icons">book</i>
            <Text>{searchBar.book}</Text>
          </TextIconContainer>
          <TextIconContainer onClick={()=> window.history.back()}  >
            <i class="material-icons">chrome_reader_mode</i>
            { <Text> Chapter {chapterNum}</Text> }
          </TextIconContainer>
          <TextIconContainer selected={true}>
            <i class="material-icons">graphic_eq</i>

            {
              kanban ?
                <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  animation="slide-up"
                  onVisibleChange={this.onVisibleChange()}
                >
                  <Text>Chunk {this.props.chunkNum}</Text>
                </Dropdown>
                :
                ''
            }


          </TextIconContainer>

        </IconsContainer>
        <IdenticonContainer>
          <Identicon id="ActiveUser"
            data-jdenticon-hash={loggedInUser}
            onMouseEnter={()=> this.setState({displayLogOut: true})}
            onMouseLeave={()=> this.hiddeLogOut()} />
          <LogOut display={this.state.displayLogOut} onClick={()=> this.logOut()} class="tooltip">
            <span>Log Out</span>
          </LogOut>
        </IdenticonContainer>
      </Container>
    );
  }
}




const Container = styled.div`
  background-color: #fff;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 3px 4px 5px rgba(0,0,0,0.2);
  z-index: 2;
  min-height: 80px;
`;
const Text = styled.p`
  cursor: pointer;
`;

const TextIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: ${props=> props.selected ? '#009CFF': ''}
`;

const Identicon= styled.svg`
  height: 5vw;
  width: 5vw;

`;

const LogOut = styled.div`
  visibility: ${props=> props.display ? 'visible' : 'hidden'};
  width: 120px;
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
