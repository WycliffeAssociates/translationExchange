import React from 'react';
import  {ReactMicPlus}  from 'react-mic-plus';
import styled from 'styled-components';
import TimeLine from './timeLine.png';
import Waveform from './Waveform';

export default ({recordedBlob, audio, onStop, recording, width, height, nonstop, duration}) => {

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
          duration={duration}
          nonstop={nonstop}
          width={width}
          height={height}
        />
      </RecordContainer>
    </Container>
  );
};



const Container = styled.div`
width: 100%;
height: 20vw;
background-image: url(${TimeLine} );
background-position: 50%;
background-repeat: no-repeat;
background-color: #2D2D2D;
background-size: contain;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
display: flex;

`;
const RecordContainer = styled.div`
width: 100%;
height: 100%;
& > canvas {
  width: 40vw;
  height: 20vw;
}
`;
