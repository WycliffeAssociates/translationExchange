import React from 'react';
import styled, {keyframes} from 'styled-components';
import img1 from '../mockupdata/img1.PNG';
import BorderButton from '../../../components/BorderButton'
import {zoomIn} from "react-animations";


export default class NewProjectCard extends React.Component {


    reviewProject = () => {
      const {projectId, getChapters, history, bookName, mode } = this.props;
      getChapters(projectId, history);

      const modeCap = mode.charAt(0).toUpperCase() + mode.slice(1);
      history.push({
        pathname: './chapters',
        search: `?projectId=${projectId}&&bookName=${bookName}&&mode=${modeCap}`,
      });
    };

    render() {
      const { bookName, version, dateModified, language, txt } = this.props;

      return (
        <Card>
          <InformationContainer >
            <TextContainer>
              <BookText> {bookName} </BookText>
              <Text>{language}</Text>
            </TextContainer>
          </InformationContainer>


          <ImageContainer>
            <Image src={img1} alt="Smiley face" height="106px" width="338px" />
          </ImageContainer>


          <ButtonsContainer>
            <BorderButton
              onClick ={this.props.cancel} txt={'Export'}
              color={'#009CFF'}
              height={'40px'}
              width={'154px'}
              icon={'publish'}
              iconSize={'24px'}
              border={'2px'}
              radius={'4px'}
              fontSize={'14px'}
            />

            <BlueButton onClick={this.reviewProject} >Select <i class="material-icons">touch_app</i> </BlueButton>

          </ButtonsContainer>
        </Card>

      );
    }

}



const zoomInAnimation = keyframes `${zoomIn}`;

const Card= styled.div`
    text-align: center;
    height: 226px
    width: 338.5px;
    min-width: 350px;
    border-radius: .5vw;
    box-shadow: 0px 1px 2px 4px rgba(0,0,0,0.2);
    overflow: hidden;
    background-color: white;
    margin: 0 0 3vw 4vw;
    animation: ${zoomInAnimation} .2s ease-in;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
Card.displayName = 'Card';

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 14px;

`;

const Image = styled.img`
   height: 9.5vw;
   width: 100%
`;
Image.displayName = 'Image';

const BookText= styled.p`
   font-size: 14px;
   font-weight: bold;
   margin-bottom: 0;
`;
BookText.displayName = 'BookText';

const Text = styled.p`
   font-size: 14px;
   color: #606060;
`;
Text.displayName = 'Text';

const InformationContainer = styled.div`
  height: 41px;

`;
InformationContainer.displayName = 'InformationContainer';

const ImageIndicatorContainer = styled.div`
  width: 50;
`;
ImageIndicatorContainer.displayName = 'ImageIndicatorContainer';

const ImageContainer = styled.div`
  width: 100%;
  height: 106px;
  overflow: hidden;
`;
ImageContainer.displayName = 'ImageContainer';

const TextContainer = styled.div`
  padding-top: .5vw;
  padding-left: .7vw;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
TextContainer.displayName = 'TextContainer';

const ReviewButton = styled.button`

    i {
      vertical-align: middle;
    }
    color: #fff;
    border: none;
    height: 4vh;
    width: inherit;
    background-color: #009CFF;
    cursor: pointer;
  `;
ReviewButton.displayName = 'ReviewButton';

const ButtonContainer= styled.div`

    background: #009CFF;
    width: 100%;
    min-height: 40px;
    padding: 0.25vw;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
  `;
ButtonContainer.displayName = 'ButtonContainer';

const BlueButton = styled.button`
    background: linear-gradient(to bottom, #00C5FF, #009CFF);
    width: 154px;
    height: 40px;
    font-size: 20px;
    font-weight: 100;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: .2s ease-in-out;

    i {
      vertical-align: middle;
    }

    :hover{
      background: linear-gradient(to bottom, #FFF, #FFFE);
      color: #009CFF;
      border: 2px solid #009CFF;

    }
    `;
