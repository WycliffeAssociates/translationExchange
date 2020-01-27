import React from 'react';
import styled, {keyframes} from 'styled-components';
import BorderButton from '../../../components/BorderButton';
import {zoomIn} from 'react-animations';
import jdenticon from 'jdenticon';
import getIllustrations from '../../../../js/getIllustrations';

export default class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { displayModal: false, illustrations: null };
  }

  componentWillMount() {
    let illustrations = getIllustrations(this.props.slug);
    this.setState({ illustrations: illustrations});
  }

  componentDidMount() {
    jdenticon.update('#user',this.props.loggedInUser? this.props.loggedInUser: 'no author info');
  }

  showModal = () =>{
    //this.props.resetExport();
    const {bookName, projectId, updateExportModal} = this.props;
    updateExportModal('bkName', bookName);
    updateExportModal('projId', projectId);
    updateExportModal('showModal', true);
  }


    reviewProject = () => {
      const {projectId, history, bookName, mode, setProject, slug } = this.props;
      setProject(slug);

      const modeCap = mode.charAt(0).toUpperCase() + mode.slice(1);
      history.push({
        pathname: './chapters',
        search: `?projectId=${projectId}&&bookName=${bookName}&&mode=${modeCap}`,
      });
    };

    render() {
      const { bookName, language, txt } = this.props;
      const {illustrations} = this.state;
      return (
        <Card>
          <InformationContainer >
            <QuestionButton>
               ?
            </QuestionButton>
            <TextContainer>
              <BookText> {bookName} </BookText>
              <Text>{language}</Text>
            </TextContainer>
            <Icon id="user" data-jdenticon-value={this.props.loggedInUser? this.props.loggedInUser: 'no author info'} />
          </InformationContainer>

          <ImageContainer>
            <Image src={illustrations.picker} alt="Smiley face" height="106px" width="338px" />
          </ImageContainer>

          <ButtonsContainer>
            <BorderButton
              onClick ={this.showModal} txt={txt.get("export")}
              color={'#009CFF'}
              height={'40px'}
              width={'154px'}
              icon={'get_app'}
              iconSize={'24px'}
              border={'2px'}
              radius={'4px'}
              fontSize={'14px'}
              hoverColor={'#3BAC2A'}
            />

            <BlueButton onClick={this.reviewProject} >{txt.get("select")} <i className="material-icons">touch_app</i> </BlueButton>

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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
Card.displayName = 'Card';

const Icon = styled.svg`
  position:absolute;
  height: 50px;
  width: 50px;
  left: 83%;
  top:-10px;
  margin-top: 0.6vw;
  cursor: pointer;
  `;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 14px;
  margin-left: 12px;

`;
ButtonsContainer.displayName= 'ButtonsContainer';

const Image = styled.img`
   height: 106px;
   width: 100%;
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
  position: relative;
  height: 41px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;

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

const QuestionButton = styled.button`
  height: 24px;
  width: 24px;
  background: linear-gradient(to bottom, #00C5FF, #009CFF);
  color: white;
  border-radius: 25px;
  border: none;
  outline: none;
  cursor:pointer;
`;

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
    transition: .3s ease-in-out;

    i {
      vertical-align: middle;
    }

    :hover{
      background: #3BAC2A;
      color: #FFF;
      border: 2px solid #3BAC2A;

    }
    `;
