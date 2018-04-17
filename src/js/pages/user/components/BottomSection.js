import React from 'react';
import styled from 'styled-components';
import BottomButtons from './BottomButtons';
import RecordButton from './RecordButton';

export default ({recording, generatedHash, startRecording, redo, save, audio}) => {

  let header ='What is your name?';
  let displayText = 'Record';


  let handler = <RecordButton startRecording={startRecording}  />

  if (recording) {
    displayText= 'Recording'
  }

  if (audio) {
    header='Is this OK?';
    handler = <svg id="canvas" width="20%" height="20%" data-jdenticon-value={generatedHash} />
  }

  return (
    <Container>
      <Header>{header}</Header>
      <PrivacyText> If you are concerned for your privacy or safety, please use a nickname or pseudonym.</PrivacyText>
      {handler}
      {audio ? <BottomButtons done={save}  redo={redo} /> : <BottomText>{displayText}</BottomText>}
    </Container>

  );
};


const Header = styled.h1`
`;

const BottomText = styled.p`
text-decoration: underline;
font-weight: 900;
color: #E74C3C;
margin-top: 1vw
`;

const PrivacyText = styled.p`
text-align: center;
width: 80%;
font-weight: 600;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin-top: 90px;
`;
