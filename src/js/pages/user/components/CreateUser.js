import React, {Component} from 'react';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import {fadeIn} from 'react-animations';
import styled,{keyframes} from 'styled-components';
import WaveformContainer from './WaveformContainer';
import BottomSection from './BottomSection';
import LoadingUser from './LoadingUser';
import ErrorDialog from '../../../components/ErrorDialog';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
      displayError: false,
    };
    this.onStop = this.onStop.bind(this);
    this.redo = this.redo.bind(this);
    this.save = this.save.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }


  closeDialog() {
    this.setState({
      displayError: false,
      recording: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false,
    });
  }


  startRecording = () => {
    this.setState({ recording: true });
    setTimeout(()=>{this.stopRecording(); }, 3000);
  };

  stopRecording() {
    this.setState({ recording: false });
    setTimeout(()=>{if (this.state.recordedBlob == null) {
      this.setState({displayError: true});
    } }, 500);
  }

  onStop(recordedBlob) {
    const a = new FileReader();
    if (recordedBlob !== null) {
      a.readAsArrayBuffer(recordedBlob.blob);
      let generatedHash ='';
      a.onloadend =  () => {
        generatedHash= SparkMD5.ArrayBuffer.hash(a.result);
        this.setState({recordedBlob, generatedHash, audio: true});
        jdenticon.update('#canvas', generatedHash);
      };
    }

    else {
      this.setState({displayError: true});
    }
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
    const {tempUserId} = this.props;
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        const jsonblob = reader.result;
        if (this.props.socialLogin) {
          this.props.patchUser(tempUserId, jsonblob, generatedHash, () => this.props.history.push('/projects'));
        }
        else  {
          this.props.createUser(jsonblob, generatedHash); // action to create user in db
        }
      },
      false
    );
    reader.readAsDataURL(recordedBlob.blob);
  }

  render() {
    const { recordedBlob, audio, recording, generatedHash,displayError } = this.state;
    const {loading, txt} = this.props;

    return (

      displayError?
        <ErrorDialog type="mic" txt={txt} onClick ={this.closeDialog} />
        :
        loading ? <LoadingUser txt={txt} />:
          <Container>
            <WaveformContainer
              recording={recording}
              recordedBlob={recordedBlob}
              audio={audio}
              onStop={this.onStop}
              width={640}
              height={280}
              nonstop={true}
              duration={3}
            />
            <BottomSection
              startRecording={this.startRecording}
              save={this.save}
              redo={this.redo}
              audio={audio}
              generatedHash={generatedHash}
              txt={txt}
            />

          </Container>



    );
  }
}

const fadeInAnimation =keyframes`${fadeIn}`;

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
animation: ${fadeInAnimation} .5s ease-in;
`;

export default CreateUser;
