import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state ={displayLogOut: false}
  }

  componentDidMount() {
    jdenticon.update('#ActiveUser');
}


  logOut() {
    localStorage.removeItem('token');
    
  }

  hiddeLogOut() {
    setTimeout(()=> this.setState({displayLogOut: false}) , 1500);
  }

  render() {
    return (
      <Container>
        <TextContainer>
          <Title>Translation Exchange </Title>
        </TextContainer>
        <IconsContainer>
          <i class="fas fa-book"></i>
          <i class="fas fa-tasks"></i>
          <i class="fab fa-audible"></i>
        </IconsContainer>
        <IdenticonContainer>
          <Identicon id="ActiveUser"
            data-jdenticon-value="Antonio"
            onMouseEnter={()=> this.setState({displayLogOut: true})}
            onMouseLeave={()=> this.hiddeLogOut()} />
          <LogOut display={this.state.displayLogOut} onClick={()=> this.logOut()} class="tooltip">
            <span class="tooltiptext">Log Out</span>
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
  font-size: 1.5vw;

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
