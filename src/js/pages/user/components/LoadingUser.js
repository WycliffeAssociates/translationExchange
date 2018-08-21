import React from 'react';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import config from '../../../../config/config';



export default ({txt}) => {

  return (
    <Container>
      <TextHeader>{txt.generatingUser}</TextHeader>
      <GifContainer>
        <img style={{height: '300px', width: '300px'}} src={`${config.streamingUrl}static/images/loadingRing.svg`} alt="Loading..." />
      </GifContainer>
      <BottomText>{txt.pleaseWait}</BottomText>
    </Container>
  );

}

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
animation: ${fadeInAnimation} .2s ease-in;
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
 font-size: 50px;

`;

const BottomText = styled.p`
  padding-bottom: 3vw;
  font-size: 25px;
`;
