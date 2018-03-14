import React, {Component} from 'react';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import WaveformContainer from './WaveformContainer';
import BottomSection from './BottomSection';


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
        this.props.createUser(jsonblob, generatedHash, this.done()); // action to create user in db
      },
      false
    );
    reader.readAsDataURL(recordedBlob.blob);

  }

  done() {
    this.props.history.push('/projects');
  }

  render() {
    const { recordedBlob, audio, recording, generatedHash } = this.state;

    return (
      <div style={styles.container}>
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

      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',

  },
  playButton: {
    height: '80px',
    width: '80px',
    borderRadius: '50px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    marginTop: '10px',
    outline: 'none',
  },
  WaveformContainer: {
    width: '100%',
    paddingTop: '14%',

  }

};

export default CreateUser;
