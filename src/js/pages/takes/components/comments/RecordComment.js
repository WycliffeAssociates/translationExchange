import React, {Component} from 'react';
import {ReactMic} from 'react-mic';
import './RecordComment.css';
import {Button, Grid, Icon} from "semantic-ui-react";
import axios from 'axios';

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
            blob: '',
            jsonblob: null
        }


        this.onStop = this.onStop.bind(this);
        this.deleteBlob = this.deleteBlob.bind(this);

    }

    startRecording = () => {
        this.setState({
            record: true,
            saveButton: false,
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
            blob: recordedBlob.blob,
            displayPlayer: true
        });

        var reader = new FileReader();
        reader.addEventListener("load", () => {
            this.setState({
                jsonblob: reader.result
            });

        }, false);

        reader.readAsDataURL(this.state.blob);

    }

    // componentDidUpdate() {
    //     {this.props.sendComment(this.state.AudioURL)}
    // }

    deleteBlob() {

        window.URL.revokeObjectURL(this.state.AudioURL);   // deletes an audio object


    }

    enableButton() {                         // used when you click the microphone button in the player
        this.commentContainer.saveButton();

    }

    render() {

        const displayPlayer = this.state.displayPlayer;
        const displayButton = this.state.record;

        const AudioURL = this.state.AudioURL;
        const jsonblob = this.state.jsonblob;


        let button = <StopButton onClick={this.stopRecording}/>;

        let AudioPlayer = null;

        let MainButton = null;

        if (displayPlayer) {
            AudioPlayer = <DisplayAudioPlayer displayPlayer={displayPlayer} type={this.props.type} id={this.props.id}
                                              jsonblob={jsonblob} AudioURL={AudioURL} onClickSave={this.props.onClickSave}/>;

        }

        if (displayButton) {
            MainButton = <StopButton onClick={this.stopRecording}/>;
        } else {

            MainButton = <button
                className="start"
                onClick={this.startRecording}
                type="button">
                <Icon size='small' name='microphone' inverted/>
            </button>;
        }

        return (

            <div>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    strokeColor="#039BE5"
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
            <Icon name="stop" size='small' inverted/>
        </button>
    );
}


function DisplayAudioPlayer(props) {
    const displayPlayer = props.displayPlayer;
    const AudioURL = props.AudioURL;
    const jsonblob = props.jsonblob;
    const type = props.type;
    const id = props.id;


    if (displayPlayer) {

        return (

            <Grid columns={2}>
                <Grid.Column width={13}>
                    <audio className="audioPlayer" controls name="media">
                        <source src={AudioURL} type="audio/webm"/>
                    </audio>
                </Grid.Column>

                <Grid.Column width={3}>
                    {jsonblob ? <Button positive size="small" onClick={() => {
                        props.onClickSave(jsonblob, type, id)
                    }}>Save</Button> : ''}
                </Grid.Column>
            </Grid>
        );
    }
    return null;
}


export default RecordComment;