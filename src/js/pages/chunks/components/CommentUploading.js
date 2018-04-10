import React from 'react';
import styled from 'styled-components';
import loadingComment from '../../../../assets/images/loading_comments.gif'



export default () => {
    return (
        <Container>
            <ItemsContainer>
                <GifContainer>
                    <img style={{height: '12vw', width:'12vw'}} src={loadingComment} alt="Loading_comment" />
                </GifContainer>
                <BottomText>Uploading...</BottomText>
            </ItemsContainer>
        </Container>
    );
}



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



