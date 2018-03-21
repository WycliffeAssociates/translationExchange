import React, {Component} from 'react';
import styled from 'styled-components';
import jdenticon from 'jdenticon';

class NavBar extends Component {

  componentDidMount() {
    jdenticon.update('#ActiveUser', 'Antonio');
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
          <Identicon id="ActiveUser" data-jdenticon-value="Antonio" />
        </IdenticonContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 3px 4px 5px rgba(0,0,0,0.2);
  z-index: 2;
  background: white;
`;

const Identicon= styled.svg`
  height: 5vw;
  width: 5vw;
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
