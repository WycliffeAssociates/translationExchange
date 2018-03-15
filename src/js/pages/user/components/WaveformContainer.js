import React from 'react';
import { ReactMic } from 'react-mic';
import styled from 'styled-components';
import TimeLine from './timeLine.png';
import Waveform from './Waveform';

export default ({recordedBlob, audio, onStop, recording}) => {

  if (audio) {
    return (
      <Container>
        <Waveform audioFile={recordedBlob.blob} />
      </Container>
    );

  }
  return (
    <Container>
      <RecordContainer>
        <ReactMic
          record={recording}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#009CFF"
          backgroundColor="transparent"
        />
      </RecordContainer>
    </Container>
  );
};

const Container = styled.div`
width: 100%;
height: 29vh;
min-width: 469;
background-image: url(${TimeLine} );
background-position: 50%;
background-repeat: no-repeat;
background-color: #2D2D2D;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
`;
const RecordContainer = styled.div`
margin-top: 3%;
height: 29vh;
width: 100%;
`;
