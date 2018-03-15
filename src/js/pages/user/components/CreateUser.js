import React, {Component} from 'react';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import styled from 'styled-components';
import WaveformContainer from './WaveformContainer';
import BottomSection from './BottomSection';
import LoadingUser from './LoadingUser';


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
    this.save = this.save.bind(this);
  }


  startRecording = () => {
    this.setState({ recording: true });
    setTimeout(()=>{this.stopRecording(); }, 3000);
  }

  stopRecording() {
    this.setState({ recording: false });
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


  redo() {
    this.setState({
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    });
  }

  save() {               // saves to database
    const {recordedBlob, generatedHash} = this.state;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const jsonblob = reader.result
        this.props.createUser(jsonblob, generatedHash); // action to create user in db
      },
      false
    );
    reader.readAsDataURL(recordedBlob.blob);
  }

  render() {
    const { recordedBlob, audio, recording, generatedHash } = this.state;
    const {loading} = this.props;

    return (
      loading ? <LoadingUser />:
        <Container>
          <WaveformContainer
            recording={recording}
            recordedBlob={recordedBlob}
            audio={audio}
            onStop={this.onStop}
          />
          <BottomSection
            startRecording={this.startRecording}
            save={this.save}
            redo={this.redo}
            audio={audio}
            generatedHash={generatedHash}
          />

        </Container>



    );
  }
}


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
`;

export default CreateUser;
