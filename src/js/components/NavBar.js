import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state ={displayLogOut: false}
  }

  componentDidMount() {
    const {loggedInUser}= this.props;
    jdenticon.update('#ActiveUser', loggedInUser);
    debugger;
}


  logOut() {
    localStorage.removeItem('token');
    this.props.history.push('./welcome');

  }

  hiddeLogOut() {
    setTimeout(()=> this.setState({displayLogOut: false}) , 1500);
  }

  render() {
    const {loggedInUser, book, language, history}= this.props;
    return (
      <Container>
        <TextContainer>
          <Title>Translation Exchange </Title>
        </TextContainer>
        <IconsContainer>
          <TextIconContainer onClick={()=> history.push('/projects')}>
            <i class="material-icons">book</i>
            <Text>{book.name}</Text>
          </TextIconContainer>
          <TextIconContainer onClick={()=> history.push(`/projects?lang=${language.slug}`)} >
            <i class="material-icons">chrome_reader_mode</i>
            <Text>{language.name}</Text>
          </TextIconContainer>
          <TextIconContainer selected={true}>
            <i class="material-icons">graphic_eq</i>
            <Text>chunk</Text>
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
`;
const Text = styled.p`
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

const mapStateToProps = state => {
  const {loggedInUser} = state.user;
  return {loggedInUser}

}
export default connect(mapStateToProps)(NavBar);
