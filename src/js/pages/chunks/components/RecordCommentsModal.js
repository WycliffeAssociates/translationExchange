import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import timeLine from '../../../../assets/images/CommentstimeLine.png';
import styled from 'styled-components';
import WaveForm from './WaveForm';

class RecordCommentModal extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.onStop = this.onStop.bind(this);
    this.onFinishPlaying = this.onFinishPlaying.bind(this);
    this.baseState = this.state;
  }

  initialState(modalOpened) {
    let showModal = false;
    if (modalOpened){   // handle the case when the modal is already opened
        showModal = true;
    }
      return {
          recordedBlob: null,
          recording: false,
          header: 'Record your comment',
          icon: 'mic_none',
          playing: false,
          isAudioAvailable: false,
          jsonBlob: null,
          showModal
      }
  }

    componentWillReceiveProps(nextProps){
    this.setState({showModal: nextProps.display})
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => {
    this.setState(this.initialState());
    this.props.closeModal();

  };

  onStop(recordedBlob) {
    this.setState({recordedBlob, isAudioAvailable: true});
      const reader = new FileReader();
      reader.addEventListener(
          "load",
          () => {

              this.setState({
                  jsonBlob: reader.result
              });
          },
          false
      );

      reader.readAsDataURL(recordedBlob.blob);
  }

  redo = () => {this.setState(this.initialState(true))};

  startRecording = () => this.setState({recording: true, header: 'Recording...', icon: 'stop' });

  stopRecording = () => this.setState({ header: 'Is this ok?', recording: false, icon: 'play_arrow'});

  onFinishPlaying() { this.setState({icon: 'play_arrow', playing: false})}

  saveComment =()=> {
    const {id, type} = this.props;
    const {jsonBlob} = this.state;
    this.props.saveComment(jsonBlob, type, id);
  };


  playPause=()=> {
    let icon ='pause';
    if (this.state.playing) {
      icon='play_arrow'
    }
    this.setState({ playing: !this.state.playing, icon });
  };


  render() {
    const { recording, header, icon, recordedBlob, playing, isAudioAvailable, showModal } = this.state;
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
        open={showModal}
        onClose={this.close}
        size="mini"
        style={{position: 'absolute', left: '30vw', top: '48vh', width: '40vw', height:'40vw'}}
      >
        <ModalContainer>
            <CloseContainer><Span onClick={()=>this.close()}>X</Span></CloseContainer>
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
              <BackgroundCircle>
                 <RecordButton onClick={buttonState}> <i style={{fontSize:'2.5vw'}} class="material-icons">{icon}</i> </RecordButton>
              </BackgroundCircle>
            </RecordButtonContainer>
            {recordedBlob != null ?
              <ButtonsContainer>
                <RedoButton onClick={this.redo}> <i class="material-icons">redo</i> Redo </RedoButton>
                <BlueButton onClick={this.saveComment}> Yes <i class="material-icons">check</i> </BlueButton>
              </ButtonsContainer>
              :
              <ButtonsContainer>
                      <BlueButton onClick={this.close}> <i class="material-icons">keyboard_backspace</i>Go Back  </BlueButton>
              </ButtonsContainer>
            }
          </ControlsContainer>
        </ModalContainer>
      </Modal>
    );
  }
}



const TextContainer = styled.div`
  margin-top: .5vw;
  
`;

const CloseContainer= styled.div`
  
`;

const Span = styled.span`
color:white;
font-size:1.8vw;
position:absolute;
top:0.3vw;
right:.6vw;
cursor:pointer;
`;

const Text = styled.p`
  font-size: 2vw;
  font-weight: bold;

`;

const RecordButtonContainer = styled.div`
    width: 6vw;
	height: 6vw;
	position: relative;
	font-size: 1vw;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width:100%;
`;

const RecordButton = styled.button`
 background-color: white;
	height: 75%;
	width: 75%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
    cursor: pointer;
    border-radius: 3vw;
    color: #E74C3C;
    outline: none;
`;

const BackgroundCircle = styled.div`
    background-color: #EEEEEE;
	height: 100%;
	width: 100%;
	border-radius: 3vw;
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
  height: 39vw;
`;

const WaveformContainer = styled.div`
 display: flex;
 justify-content: center;
 background-color: #2D2D2D;
 background-image: url(${timeLine});
 background-position: 50%;
 background-repeat: no-repeat;
 width:100%;
`;

const ControlsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export default RecordCommentModal;
