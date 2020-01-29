import React from 'react';
import styled from 'styled-components';
import loadingRing from '../../../../../assets/images/loadingRing.svg';


export default ({txt}) => {
  return (
    <Container>
      <ItemsContainer>
        <GifContainer>
          <img style={{height: '12vw', width: '12vw'}} src={loadingRing} alt="Loading_comment" />
        </GifContainer>
        <BottomText>{txt.get("uploading")}</BottomText>
      </ItemsContainer>
    </Container>
  );
};



const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100%;
`;

const GifContainer = styled.div`

`;

const ItemsContainer = styled.div``;


const BottomText = styled.p`
  padding-bottom: 2vw;
  font-size: 1.2vw;
  font-weight: bold;
  text-align:center;
`;
