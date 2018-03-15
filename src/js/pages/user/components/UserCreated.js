import React, {Component} from 'react';
import jdenticon from 'jdenticon';
import styled from 'styled-components';



class UserCreated extends Component {


  componentDidMount() {
    const {hash} =this.props.user || '' ;
    jdenticon.update('#createdUser' , hash);
  }

  redirect() {
    this.props.history.push({pathname: '/projects'});
  }

  render() {
    const {hash} = this.props;

    return (
      <Container>
        <TextHeader> You are ready to go! </TextHeader>
        <IdenticonContainer>
          <svg id="createdUser" width="90%" height="90%" data-jdenticon-value="asdaad3dasasda3asd" />
        </IdenticonContainer>
        <Button onClick={()=>this.redirect()}> go to projects <i className="fa fa-arrow-right" /> </Button>
      </Container>
    );
  }
}



const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
justify-content: space-between;
`;

const TextHeader = styled.h1`
  padding-top: 3vw;
  font-size: 2.5vw;
`;

const IdenticonContainer = styled.div`
  display:flex;
  justify-content: center;
`;


const Button= styled.button`
border-radius: 20px;
color: white;
background: linear-gradient(to bottom, #0076FF, #00C5FF);
padding: 0.4vw 4vw;
font-size: 1.1vw;
font-weight: 100;
border: none;
text-decoration: underline;
box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
cursor: pointer;
`;
Button.displayName = 'Button';
export default UserCreated;
