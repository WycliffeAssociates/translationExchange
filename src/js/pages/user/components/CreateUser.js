import React, {Component} from 'react';
import { ReactMic } from 'react-mic';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import Waveform from './Waveform';
import TimeLine from './timeLine.png';
import RecordButton from './RecordButton';
import BottomButtons from './BottomButtons';
import styled from 'styled-components';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    };
    this.onStop = this.onStop.bind(this);
    this.redo = this.redo.bind(this);
    this.done = this.done.bind(this);


  }


  startRecording = () => {
    this.setState({
      recording: true,
    });
    setTimeout(()=>{this.stopRecording(); }, 3000);
  }

  stopRecording() {
    this.setState({
      recording: false,
    });
  }

  onStop(recordedBlob) {
    const a = new FileReader();
    a.readAsArrayBuffer(recordedBlob.blob);

    let generatedHash ='';
    a.onloadend =  () => {
      generatedHash= SparkMD5.ArrayBuffer.hash(a.result);
      this.setState({recordedBlob, generatedHash, audio: true});
      jdenticon.update('svg', generatedHash);
    };



  }

  audioWave() {
    const { recordedBlob, audio } = this.state;

    if (audio) {
      return (
        <RecordContainer>
          <Waveform audioFile={recordedBlob.blob} />
        </RecordContainer>
      );

    }
    return (
      <RecordContainer>

        <RecordPreview>

          <ReactMic
            record={this.state.recording}
            className="sound-wave"
            onStop={this.onStop}
            strokeColor="#009CFF"
            backgroundColor="transparent"
          />

        </RecordPreview>

      </RecordContainer>

    );
  }

  redo() {
    this.setState({
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    });
  }

  done() {
    const {recordedBlob, generatedHash} = this.state;
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const jsonblob = reader.result;
        this.props.createUser(jsonblob, generatedHash);
      },
      false
    );

    reader.readAsDataURL(recordedBlob.blob);

    this.props.history.push('/users');
  }

  bottomSection() {
    const {recording, generatedHash} = this.state;
    let header ='What is your name?';
    let bottomText = 'Record';
    let textStyle = styles.textRecord;

    let handler = <RecordButton startRecording={this.startRecording} icon={'microphone'} /> ;

    if (recording) {
      bottomText= 'Recording';
    }

    if (this.state.audio) {
      header='is this OK?';

      bottomText=
      handler = <svg id="canvas" width="20%" height="20%" data-jdenticon-value={generatedHash} />;
    }

    return (

      <CenterContainer>
        <h1>{header}</h1>

        <TextPrivacy>If you are concerned for your privacy or safety, please use a nickname or pseudonym.</TextPrivacy>
        {handler}
        {this.state.audio ? <BottomButtons done={this.done}  redo={this.redo} /> : <p style={textStyle}>{bottomText}</p>}

      </CenterContainer>

    );
  }


  render() {


    return (
      <Container>

        {this.audioWave()}
        {this.bottomSection()}

      </Container>
    );
  }
}





const  Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
 `;
Container.displayName = 'Container';

const  CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20%;
  `;
CenterContainer.displayName = 'CenterContainer';
const TextPrivacy = styled.p`
    text-align: center;
    width: 80%;
    font-weight: 600;
  `;
TextPrivacy.displayName = 'TextPrivacy';

const RecordContainer = styled.div`
    width: 100%;
    height: 35%;
    min-width: 469;
    background-image: url(${ TimeLine });
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #2D2D2D;
    border-top-left-radius: 7;
    border-top-right-radius: 7;
  `;
RecordContainer.displayName = 'RecordContainer';
const RecordPreview = styled.div`
    margin-top: 3%;
    width: 100%;
  `;

const WaveformContainer = styled.div`
    width: 100%;
    padding-top: 14%;
`;
WaveformContainer.displayName = 'WaveformContainer';
const  IconStyle = styled.div`
    margin-left: 5%;
    color: #E74C3C;
`;
IconStyle.displayName = 'IconStyle';
const styles = {
  playButton: {
    height: '5vw',
    width: '5vw',
    borderRadius: '100px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    marginTop: '10px',
    outline: 'none',
  },
  textRecord: {
    fontSize: '1vw',
    textDecoration: 'underline',
    lineHeight: 1.8,
    fontWeight: 900,
    color: '#E74C3C',
  },

};

export default CreateUser;
