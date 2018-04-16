import React from 'react';
import { ReactMicPlus } from 'react-mic-plus';
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
        <ReactMicPlus
          record={recording}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#009CFF"
          backgroundColor="transparent"
          visualSetting="spectrogram"
          duration={3}
          nonstop={false}
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
padding: 0 1vw;
`;
const RecordContainer = styled.div`
margin-top: 4.5vh;
height: 29vh;
width: 100%;
`;
