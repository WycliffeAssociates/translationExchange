import React from 'react';
import { ReactMicPlus } from 'react-mic-plus';
import timeLine from '../../../../../assets/images/CommentstimeLine.png';
import styled from 'styled-components';
import Wave from './Wave';

export default ({recordedBlob, isAudioAvailable, onStop, recording, play, onFinishPlaying}) => {

  if (isAudioAvailable) {
    return (
      <Container>
        <Wave audioFile={recordedBlob.blob} play={play} onFinishPlaying={onFinishPlaying} />
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
        />
      </RecordContainer>
    </Container>
  );
};

const Container = styled.div`
width: 100%;
height: 29vh;
min-width: 469;
background-position: 50%;
background-repeat: no-repeat;
background-image: url(${timeLine});
background-color: #2D2D2D;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
`;
const RecordContainer = styled.div`
margin-top: 4.5vh;
height: 29vh;
width: 100%;
`;
