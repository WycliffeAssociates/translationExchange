import React, { Component } from 'react';
import loading from '../../assets/images/loadingRing.svg';
import styled from 'styled-components';

class Loading extends Component {
  render() {
    const {height}  = this.props;
    return (
      <Container height= {height} >
        <h1>Loading...</h1>
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
Container.displayName = 'Container';

export default Loading;
