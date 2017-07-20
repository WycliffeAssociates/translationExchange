import React, {Component} from 'react';
import { ReactMic } from 'react-mic';
import './RecordComment.css';
import mic from './Group.png';
import stop from './stopButton.png';

let startRecording;
let stopRecording;

export class RecordComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: false,
            displayPlayer: false,
            AudioURL: "",
            DisableSaveButton: true,
            blob: ''
        }



        this.onStop = this.onStop.bind(this);
        this.deleteBlob = this.deleteBlob.bind(this);

    }

    startRecording = () => {
        this.setState({
            record: true,
            saveButton:false,
            displayPlayer: false
        });

        this.deleteBlob();    // deleted blob object in case the user records a new audio comment


    }

    stopRecording = () => {
        this.setState({
            record: false
        });

        this.props.changeSaveButtonState(false);



    }

    onStop(recordedBlob) {

        this.setState({displayPlayer: true});
        //change this to the real url so that it can playback
        this.setState({
            AudioURL: recordedBlob.blobURL,
            blob: recordedBlob,
        });

        if (this.state.AudioURL !== ''){
            {this.props.sendComment(this.state.blob)}
        }

    }

    // componentDidUpdate() {
    //     {this.props.sendComment(this.state.AudioURL)}
    // }

    deleteBlob(){

        window.URL.revokeObjectURL(this.state.AudioURL);   // deletes an audio object
    }


    enableButton() {                         // used when you click the microphone button in the player
        this.commentContainer.saveButton();

    }

    render() {

        const displayPlayer = this.state.displayPlayer;
        const displayButton = this.state.record;

        const AudioURL = this.state.AudioURL;



        let button = <StopButton  onClick={this.stopRecording} />;

        let startButton=  <button className="start" onClick={this.startRecording} type="button"> <img className="mic" src={mic}/> </button>;

        let AudioPlayer = null;

        let MainButton = null;

        if (displayPlayer) {
            AudioPlayer =  <DisplayAudioPlayer displayPlayer={displayPlayer} AudioURL = {AudioURL} />;

        }

        if(displayButton){
            MainButton = <StopButton  onClick={this.stopRecording} />;
        }else{

            MainButton= <button className="start" onClick={this.startRecording} type="button"> <img className="mic" src={mic} /> </button>;
        }

        return (

            <div>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    strokeColor="#42adf4"
                    backgroundColor="#000000"


                />
                <div className="record-stop-button">
                    {MainButton}
                </div>

                <div>
                    {AudioPlayer}
                </div>




            </div>
        );
    }
}



function StopButton(props) {
    return (
        <button className="stop" onClick={props.onClick}>
            <img className="mic" src={stop}/>
        </button>
    );
}






function DisplayAudioPlayer(props) {
    const displayPlayer = props.displayPlayer;

    const AudioURL = props.AudioURL;


    if (displayPlayer) {

        return (

            <audio className="audioPlayer" controls name="media"  >
                <source src= {AudioURL} type = "audio/webm" />
            </audio>
        );
    }
    return null;
}


export default RecordComment;