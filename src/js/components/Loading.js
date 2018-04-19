import React, { Component } from 'react';
import loading from '../../assets/images/loadingRing.svg';
import styled from 'styled-components';

class Loading extends Component {
  render() {
    return (
      <Container height= {this.props.height} >
        <h1>{this.props.txt.loading}</h1>
        <img src={loading} alt="Loading..." />
      </Container>
    );
  }
}


const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${props => props.height? props.height: '60vh' };
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;


export default Loading;
