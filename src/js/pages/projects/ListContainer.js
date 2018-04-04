import React, {Component} from 'react';
import styled from 'styled-components';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';






class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state={ulbSelected: true}
  }



  render() {
    return (

      <Container>
        <AvailableProjectsMenu>
            <P>Available Projects</P>
          <ButtonsContainer>
            <UlbButton color={this.state.ulbSelected} onClick={()=> this.setState({ulbSelected: true})}>
              ULB
            </UlbButton>
            <UdbButton color={this.state.ulbSelected} onClick={()=> this.setState({ulbSelected: false})}>
              UDB
            </UdbButton>
          </ButtonsContainer>
            <BookDropDown>
                Book
            </BookDropDown>
            <LanguageDropDown>
                Language
            </LanguageDropDown>
        </AvailableProjectsMenu>
        <AvailableProjects>
          menu


        </AvailableProjects>


      </Container>
    );
  }
}

const Container = styled.div`
   width: 100%;
   text-align: center;
   display: flex;
   align-items: center;
   flex-direction:column;
   
   
`;

const AvailableProjectsMenu = styled.div`
    width:80%
    height: 11vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const AvailableProjects = styled.div`
padding-top: 1vw;
    

`;

const P = styled.p`
padding-top: 1vw;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction:row;
  border: solid #000;
  border-width: 1.5px;
  border-radius: .3vw;
  height:2vw;
`;

const UlbButton = styled.button`
  background-color:${props=> props.color ? '#009CFF': '#fff'};
  color:${props=> props.color ? '#fff': '#000'};
  border: none;
  width: 50%;
  border-radius:  .3vw 0 0 .3vw;
  outline:none;
  cursor:pointer;
`;

const UdbButton = styled.button`
  background-color:${props=> !props.color ? '#009CFF': '#fff'};
  color:${props=> !props.color ? '#fff': '#000'};
  border: none;
  border-radius: 0 .3vw .3vw 0;
  width: 50%;
  outline:none;
  cursor:pointer;
`;

const BookDropDown = styled.div`
 height:2vw;
  border: solid #000;
  border-width: 1.5px;
  border-radius: .3vw;
`;

const LanguageDropDown = styled.div`
  height:2vw;
  border: solid #000;
  border-width: 1.5px;
  border-radius: .3vw;
`;




export default ListContainer;
