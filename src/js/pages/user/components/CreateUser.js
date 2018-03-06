import React, {Component} from 'react';
import { ReactMic } from 'react-mic';
import SparkMD5 from 'spark-md5';
import jdenticon from 'jdenticon';
import Wavesurfer from 'react-wavesurfer';


class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      recordedBlob: null,
      generatedHash: '',
      audio: false
    }
    this.onStop = this.onStop.bind(this);
  }

  startRecording = () => {
    this.setState({
      record: true
    });
    setTimeout(()=>{this.stopRecording(); }, 3000);
  }

  stopRecording() {
    this.setState({
      record: false
    });
  }

  onStop(recordedBlob) {
    const a = new FileReader();
    a.readAsArrayBuffer(recordedBlob.blob);

    let generatedHash =''
    a.onloadend =  () => {
      generatedHash= SparkMD5.ArrayBuffer.hash(a.result);
      this.setState({recordedBlob, generatedHash, audio: true})
      jdenticon.update('svg', generatedHash);
    };



  }

  audioWave() {
    const {recordedBlob, generatedHash, audio } = this.state;
    console.log(generatedHash);
    if (audio) {


      return (  <svg id="canvas" width="460" height="460" data-jdenticon-value={generatedHash}/>)
    }
    return (
      <ReactMic
        record={this.state.record}
        className="sound-wave"
        onStop={this.onStop}
        strokeColor="#039BE5"
        backgroundColor="transparent"
        style={{backgroundColor:'#fff'}}
      />

    );
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Create User</h1>
        {this.audioWave()}
        <button onClick={this.startRecording} type="button">Start</button>

      </div>
    );
  }
}

export default CreateUser;
