import React, {Component} from 'react';
import styled from 'styled-components';





class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state={ulbSelected: true}
  }



  render() {
    return (

      <Container>
        <AvailableProjectsMenu>
              Available Projects
          <ButtonsContainer>
            <UlbButton color={this.state.ulbSelected} onClick={()=> this.setState({ulbSelected: true})}>
              ULB
            </UlbButton>
            <UdbButton color={this.state.ulbSelected} onClick={()=> this.setState({ulbSelected: false})}>
              UDB
            </UdbButton>
          </ButtonsContainer>
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
   text-align:center;
   
`;

const AvailableProjectsMenu = styled.div`

`;

const AvailableProjects = styled.div`
    

`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction:row;
  border: solid #000;
  border-width: 1px;
  border-radius: .3vw;
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




export default ListContainer;
