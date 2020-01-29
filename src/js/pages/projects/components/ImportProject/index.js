import React from 'react';
import styled from 'styled-components';
import img from '../../../../../assets/images/ProjectBG.svg';
import DropTarget from './DropTarget';

export default class ImportProject extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {txt} = this.props;
    return (
      <Container>
        <h2 style={{fontWeight: '100'}}> {txt.get("noProjects")} </h2>
        <DropTarget {...this.props} />
      </Container>
    );
  }

}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 5%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(${img}), linear-gradient(to bottom right, #F3F3F3 , #F3F3F3);
  background-size: 350px;
  background-repeat: repeat;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  font-weight: 200;

`;
