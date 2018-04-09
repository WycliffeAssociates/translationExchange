import React from 'react';
import styled from 'styled-components';
import img1 from '../mockupdata/img1.PNG';


export default class ProjectCard extends React.Component {

    reviewProject = () => {
      const {projectId, getChapters, history, bookName } = this.props;

      getChapters(projectId);

     // history.push('/chaptersPage')

        history.push({
            pathname: './chapters',
            search: `?projectId=${projectId}&&bookName=${bookName}`
        });

    };

  render() {
    const{ bookName, version, dateModified, language } = this.props;



    return (
      <Container>

        <Card>
          <InformationContainer >
            <TextContainer>
              <BookText> <i class="material-icons">book</i> {bookName} </BookText>
              <Text><i class="material-icons">translate</i> {language}</Text>
              <Text><i class="material-icons">description</i> {version}</Text>
              <Text><i class="material-icons">access_time</i> {dateModified}</Text>

            </TextContainer>
            <ImageIndicatorContainer>
              <div></div>
              <ImageContainer>
                <Image src={img1} alt="Smiley face" height="10vw" width="10vw"/>
              </ImageContainer>

            </ImageIndicatorContainer>

          </InformationContainer>

          <ButtonContainer>
            <ReviewButton onClick={this.reviewProject}> <i class="material-icons">done_all</i> Review </ReviewButton>

          </ButtonContainer>
        </Card>

      </Container>
    );
  }

}

const Container = styled.div`
  // background: linear-gradient(to bottom right, rgba(0,118,255,0.5), rgba(0,197,255,0.5));
  margin: 0 0 1vw 1vw;
`;

const Card= styled.div`
    text-align: center;
    height: 35vh - 5vw;
    width: 26vw;
    border-radius: .5vw;
    box-shadow: 0px 1px 2px 4px rgba(0,0,0,0.2);
    overflow: hidden;
    background-color: white;


`;

const Image = styled.img`
   height: 9.5vw;
   width: 13.5vw;
`;

const BookText= styled.p`
   font-size: 1.5vw
   font-weight: bold;
`;

const Text = styled.p`
   font-size: 1vw
   color: #606060;
`;

const InformationContainer = styled.div`
    display:flex;
    flex-direction: row;
    height: 82%;
`;

const ImageIndicatorContainer = styled.div`
  width: 50;

`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 2vw;


`;

const TextContainer = styled.div`
  padding-top: .5vw;
  padding-left: .7vw;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ReviewButton = styled.button`

    i {
      vertical-align: middle;
    }
    color: #fff;
    border: none;
    height: 3vh;
    width: 100%;
    background-color: #009CFF;
    cursor: pointer;
    font-size: 1.1vw; //in the font awesome library the font size ends up controlling the size of the icon
  `;

const ButtonContainer= styled.div`

    background: #009CFF;
    width: inherit;
    padding: 0.25vw;
    overflow: hidden;
    text-align: center;
    border-color: white;
    border-width: 1vw;
  `;

const SignOutButton = styled.div`
    display: inline-block;
    color: white;
    border: none;
    background-color: #009CFF;
    height: 3.5vw;
    width: 7vw;
    padding-left: 2vw;
    font-size: 2vw; //in the font awesome library the font size ends up controlling the size of the icon
`;
