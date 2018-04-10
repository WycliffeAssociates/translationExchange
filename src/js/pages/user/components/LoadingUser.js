import React, {Component} from 'react';
import styled from 'styled-components';
import loadingRing from '../../../../assets/images/loadingRing.svg'



export default () => {

  return (
    <Container>
      <TextHeader> Generating User </TextHeader>
      <GifContainer>
        <img style={{height: '12vw', width: '12vw'}} src={loadingRing} alt="Loading..." />
      </GifContainer>
      <BottomText>Please Wait</BottomText>
    </Container>
  );

}



const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
height: 100%;
`;

const GifContainer = styled.div`

`;


const TextHeader = styled.h1`
 padding-top: 3vw;
 font-size: 3vw

`;

const BottomText = styled.p`
  padding-bottom: 3vw;
  font-size: 1.5vw;
`;
