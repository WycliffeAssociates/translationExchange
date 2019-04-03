import React from 'react';
import  {ReactMicPlus}  from 'react-mic-plus';
import timeLine from '../../../../../assets/images/CommentstimeLine.png';
import styled from 'styled-components';
import Wave from './Wave';

export default ({recordedBlob, isAudioAvailable, onStop, record, play, onFinishPlaying, width, height, nonstop, duration}) => {

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
          record={record}
          className="sound-wave"
          onStop={onStop}
          strokeColor="#009CFF"
          backgroundColor="transparent"
          visualSetting="spectrogram"
          width={width}
          height={height}
          nonstop={nonstop}
          duration={duration}
        />
      </RecordContainer>
    </Container>
  );
};

const Container = styled.div`
width: 100%;
height: 20vw;
background-position: 50%;
background-repeat: no-repeat;
background-image: url(${timeLine});
background-color: #2D2D2D;
background-size: content;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
display: flex;
`;
const RecordContainer = styled.div`
width: 100%;
height: 100%;
& > canvas {
  width: 55vw;
  height: 20vw;
}
`;
