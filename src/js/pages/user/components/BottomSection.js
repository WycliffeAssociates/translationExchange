import React from 'react';
import styled from 'styled-components';
import BottomButtons from './BottomButtons';
import RecordButton from './RecordButton';

export default ({recording, generatedHash, startRecording, redo, save, audio, txt}) => {

  let header = txt.get("whatIsYourName");
  let displayText = txt.get("record");


  let handler = <RecordButton startRecording={startRecording}  />

  if (recording) {
    displayText= 'Recording'
  }

  if (audio) {
    header= txt.get("isThisOk");
    handler = <svg id="canvas" width="20%" height="20%" data-jdenticon-hash={generatedHash} />
  }

  return (
    <Container>
      <Header>{header}</Header>
      <PrivacyText> {txt.get("privacyText")}</PrivacyText>
      {handler}
      {audio ? <BottomButtons txt={txt} done={save}  redo={redo} /> : <BottomText>{displayText}</BottomText>}
    </Container>

  );
};


const Header = styled.h1`
  font-size: 3vh;
  text-align: center;
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
margin-top: 3vw;
font-size: 2vh;
`;
