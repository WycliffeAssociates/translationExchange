import React from 'react';
import styled, {keyframes} from 'styled-components';
import {fadeIn} from 'react-animations';
import loadingRing from '../../../../assets/images/loadingRing.svg';



export default ({txt}) => {

  return (
    <Container>
      <TextHeader>{txt.get("generatingUser")}</TextHeader>
      <GifContainer>
        <img style={{height: '300px', width: '300px'}} src={loadingRing} alt="Loading..." />
      </GifContainer>
      <BottomText>{txt.get("pleaseWait")}</BottomText>
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
