import React, { Component } from 'react';
import loading from '../../assets/images/loadingRing.svg';
import styled from 'styled-components';

class Loading extends Component {
  render() {
    return (
      <Container>
        <h1>Loading...</h1>
        <img src={loading} alt="Loading..." />
      </Container>
    );
  }
}


const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;


export default Loading;
