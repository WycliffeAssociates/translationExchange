import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import {ReactMic} from 'react-mic';
import styled from 'styled-components';
import WaveForm from './WaveForm';

class RecordCommentModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      recordedBlob: null,
      recording: false,
      header: 'Record your comment',
      icon: 'mic_none',
      playing: false,
      isAudioAvailable: false,
    };
    this.onStop = this.onStop.bind(this);
    this.onFinishPlaying = this.onFinishPlaying.bind(this);
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({open: false });

  onStop(recordedBlob) { this.setState({recordedBlob, isAudioAvailable: true});}

  startRecording = ()=>{ this.setState({recording: true, header: 'Recording...', icon: 'stop' });}

  stopRecording = ()=>{ this.setState({ header: 'is this ok?', recording: false, icon: 'play_arrow'});}

  onFinishPlaying() { this.setState({icon: 'play_arrow', playing: false})}

  saveComent =(recordedBlob)=> {
    debugger;
  }

  playPause=()=> {
    let icon ='pause';
    if (this.state.playing) {
      icon='play_arrow'
    }
    this.setState({ playing: !this.state.playing, icon });
  }


  render() {
    const { recording, header, icon, recordedBlob, playing, isAudioAvailable } = this.state;
    const {display}= this.props;
    let buttonState = this.startRecording;
    if (recording) {
      buttonState = this.stopRecording;
    }
    if (recordedBlob != null) {
      buttonState = this.playPause;
    }

    return (

      <Modal
        dimmer={true}
        open={display}
        onClose={this.close}
        size="mini"
        style={{position: 'absolute', left: '35vw', top: '48vh', width: '30vw'}}
      >
        <ModalContainer>
          <WaveformContainer>
            <WaveForm
              play={playing}
              onFinishPlaying={()=>this.onFinishPlaying()}
              isAudioAvailable={isAudioAvailable}
              recordedBlob={recordedBlob}
              onStop={this.onStop}
              recording={recording} />
          </WaveformContainer>
          <ControlsContainer>
            <TextContainer>
              <Text>{header}</Text>
            </TextContainer>
            <RecordButtonContainer>
              <RecordButton onClick={buttonState}> <i class="material-icons">{icon}</i> </RecordButton>
            </RecordButtonContainer>
            {recordedBlob != null ?
              <ButtonsContainer>
                <RedoButton>Redo <i class="material-icons">redo</i> </RedoButton>
                <BlueButton onClick={this.saveComment}> Yes <i class="material-icons">check</i> </BlueButton>
              </ButtonsContainer>
              :
              <ButtonsContainer>
                <BlueButton>Go Back <i class="material-icons">keyboard_backspace</i> </BlueButton>
              </ButtonsContainer>
            }
          </ControlsContainer>
        </ModalContainer>
      </Modal>
    );
  }
}



const TextContainer = styled.div`

`;

const Text = styled.p`

`;

const RecordButtonContainer = styled.div`

`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width:100%;
`;

const RecordButton = styled.button`

`;

const BlueButton= styled.button`
  border-radius: 20px;
  color: white;
  background: linear-gradient(to bottom, #0076FF, #00C5FF);
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  cursor: pointer;
`;

const RedoButton= styled.button`
  border-radius: 20px;
  color: #00C5FF;
  background: white;
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: solid;
  border-width: 2px;
  border-color: #00C5FF;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  cursor: pointer;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 30vw;
`;

const WaveformContainer = styled.div`
 display: flex;
 justify-content: center;
 background-color: #2D2D2D;
`;

const ControlsContainer = styled.div`
  width:30vw;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export default RecordCommentModal;
