import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';
import PopUpDialog from './PopUpDialog';

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
          <Icon> <img style={{height: '2vw', width: '2vw', display: 'block'}} src={require('../../assets/images/class_black_54x54.png')} /> <label> 1 John </label> </Icon>
          <Icon> <img style={{height: '2vw', width: '2vw', display: 'block'}} src={require('../../assets/images/chrome_reader_mode_black_54x54.png')} /> <label> Chapter 1 </label> </Icon>
          <Icon> <img style={{height: '2vw', width: '2vw', display: 'block'}} src={require('../../assets/images/grapheq_black_54x54.png')} /> <label> Chunk 1 </label> </Icon>
        </IconsContainer>
        <IdenticonContainer>
          <Identicon id="ActiveUser"
            data-jdenticon-value="Antonio"
            onMouseEnter={()=> this.setState({displayLogOut: true})}
            onMouseLeave={()=> this.hiddeLogOut()} />
          <LogOut display={this.state.displayLogOut} onClick={()=> this.logOut()} class="tooltip">
            <span class="tooltiptext">Log Out</span>
          </LogOut>
          <PopUpDialog btnText="Review" icon='check' 
          title='Great Job!'
           para1='You completed all of the takes for chapter 1'
           para2='Would you like to review the chapter?' arrowIcon="arrow right" skipText='Skip to Chapter 2' reviewText='Review Chapter 1' btnIcon="done_all"/>
          <PopUpDialog btnText="Compile" icon='check' 
          title='Great Job!'
           para1='You completed checking chapter 1'
           para2='Would you like to compile chapter 1?' arrowIcon="arrow left" skipText='Go Back' reviewText='Compile Chapter 1' btnIcon="folder_open"/>
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
