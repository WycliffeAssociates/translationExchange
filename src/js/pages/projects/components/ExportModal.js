import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import styled from 'styled-components';


class ExportModal extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
    this.onStop = this.onStop.bind(this);
    this.onFinishPlaying = this.onFinishPlaying.bind(this);
    this.commentSaved = this.commentSaved.bind(this);
    this.error = this.error.bind(this);
  }

  initialState() {
    return {
      recordedBlob: null,
      record: false,
      header: this.props.txt.recordYourComment,
      icon: 'mic_none',
      playing: false,
      isAudioAvailable: false,
      jsonBlob: null,
      commentSaved: false,
      error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showModal: nextProps.display});
    if (nextProps.uploadError == true) {
      this.setState({error: true});
    }
  }

  componentDidMount() {
    if (this.props.uploadError == true) {
      this.setState({error: true});
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => {
    this.setState(this.initialState());
    //set timeout to ensure that state is reset to initial before the modal closes
    setTimeout(() => this.props.closeModal(), 100);

  };



    return (
      <ModalContainer>

        <CloseContainer><Span onClick={()=>this.close()}>X</Span></CloseContainer>

      </ModalContainer>
    );


  }

  render() {
    const { record, recordedBlob, showModal } = this.state;
    const {uploadingComments, txt} = this.props;
    let buttonState = this.startRecording;
    if (record) {
      buttonState = this.stopRecording;
    }
    if (recordedBlob != null) {
      buttonState = this.playPause;
    }

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          dimmer={true}
          open={showModal}
          onClose={this.close}
          size="mini"
          style={{ verticalAlign: 'middle', margin: 'auto', marginTop: '261px', width: '40vw', height: '40vw', minWidth: '825px'}}
        >
          {uploadingComments ?
            <CommentUploading txt={txt} />
            : this.showRecordModal(buttonState)}
        </Modal>

      </div>
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

const OkButtonContainer = styled.div`
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
  background: linear-gradient(to bottom,${props => props.error ? '#E74C3C, #820C00': '#0076FF, #00C5FF'} );
  padding: 0.4vw 4vw;
  font-size: 1.1vw;
  font-weight: 100;
  border: none;
  text-decoration: underline;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  outline:none;
  cursor: pointer;
  i{
    vertical-align: middle;
  }
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
  i{
    vertical-align: middle;
  }
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

const TopContainer = styled.div`
  background: linear-gradient(to bottom,${props => props.error ? '#E74C3C, #820C00': '#0076FF, #00C5FF'} );
  height:30vw;

`;

const BottomContainer =  styled.div`
  height:100%
  display:flex;
  justify-content:center;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
`;

export default ExportModal;
