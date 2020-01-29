import React, { Component } from 'react';
import styled from 'styled-components';
import loadingRingImg from '../../assets/images/loadingRing.svg';

class Loading extends Component {
  render() {
    const {height, marginTop} = this.props;
    return (

      <Container height= {height} marginTop = {marginTop} >
        <h1>{this.props.txt.get("loading")}</h1>
        <img src={loadingRingImg} alt="Loading..." />
      </Container>
    );
  }
}


const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${props => props.height? props.height: '60vh' };
  margin-top: ${props => props.marginTop? props.marginTop: 0};
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;
Container.displayName = 'Container';

export default Loading;
