import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactMic } from "react-mic";
import { Button, Grid, Icon } from "semantic-ui-react";
import "./RecordComment.css";
import LoadingGif from "images/Spinner.gif";
import CommentsPlayer from "../comments/commentsPlayer";



export class RecordComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			record: false,
			displayPlayer: false,
			AudioURL: "",
			DisableSaveButton: true,
			blob: "",
			jsonblob: null
		};
		this.onStop = this.onStop.bind(this);
		this.deleteBlob = this.deleteBlob.bind(this);
	}

	startRecording = () => {
		this.setState({
			record: true,
			saveButton: false,
			displayPlayer: false
		});

		this.deleteBlob(); // deleted blob object in case the user records a new audio comment
	};

	stopRecording = () => {
		this.setState({
			record: false
		});

		this.props.changeSaveButtonState(false);
	};

	onSave(type, id, jsonblob, func) {
		func(jsonblob, type, id, () => {
			this.setState({
				displayPlayer: false
			});
		});
	}

	onStop(recordedBlob) {
		this.setState({ displayPlayer: true });
		//change this to the real url so that it can playback
		this.setState({
			AudioURL: recordedBlob.blobURL,
			blob: recordedBlob.blob,
			displayPlayer: true
		});

		var reader = new FileReader();
		reader.addEventListener(
			"load",
			() => {
				this.setState({
					jsonblob: reader.result
				});
			},
			false
		);

		reader.readAsDataURL(this.state.blob);
	}

	deleteBlob() {
		window.URL.revokeObjectURL(this.state.AudioURL); // deletes an audio object
	}

	render() {
		const displayPlayer = this.state.displayPlayer;
		const displayButton = this.state.record;

		const AudioURL = this.state.AudioURL;
		const jsonblob = this.state.jsonblob;

		let AudioPlayer = null;

		let MainButton = null;

		if (displayPlayer) {
			AudioPlayer = (
				<DisplayAudioPlayer
					displayPlayer={displayPlayer}
					type={this.props.type}
					id={this.props.id}
					jsonblob={jsonblob}
					AudioURL={AudioURL}
					onClickSave={this.props.onClickSave}
					onSave={this.onSave.bind(this)}
					active={this.props.loadingActive}
					hideplayer={this.state.hideplayer}
					btnText={this.props.displayText.save}
				/>
			);
		}

		if (displayButton) {
			MainButton = (
				<button
					className="stopButton"
					onClick={this.stopRecording}
					type="button"
				>
					<Icon size="small" name="stop" inverted />
				</button>
			);
		} else {
			MainButton = (
				<button className="start" onClick={this.startRecording} type="button">
					<Icon size="small" name="microphone" inverted />
				</button>
			);
		}


		let display = (
			<ReactMic
				record={this.state.record}
				className="sound-wave"
				onStop={this.onStop}
				strokeColor="#039BE5"
				backgroundColor="#000000"
			/>


		);
		let saveButton = '';

		if (this.state.displayPlayer) {
			display = AudioPlayer;
		}
		return (
			<div>

				{display}

				<div className="record-stop-button">
					{MainButton}
				</div>

				{saveButton}

			</div>
		);
	}
}

function DisplayAudioPlayer(props) {
	const displayPlayer = props.displayPlayer;
	const AudioURL = props.AudioURL;
	const jsonblob = props.jsonblob;
	const type = props.type;
	const id = props.id;
	const btnText = props.btnText;
	if (displayPlayer) {
		return (
			<div style={style.audioPlayerContainer}>
				<CommentsPlayer
					audioFile={AudioURL}
					playAudio={true}
				/>

				<div style={{ height: '5%', display: 'flex' }} >
					{props.active
						? <img style={{ justifyContent: 'center', display: 'flex' }} src={LoadingGif} alt="Loading..." width="40" height="40" />
						: <Button
							positive
							size="small"
							onClick={() => {
								props.onSave(type, id, jsonblob, props.onClickSave);
							}}
						>
							{btnText}
						</Button>}
				</div>
			</div>
		);
	}
	return null;
}

const style = {
	audioPlayerContainer: {
		width: '95%',
		display: 'flex',
		alignItems: 'center',
		marginTop: '5%',
		marginBottom: '5%',
		marginLeft: '3%',
		border: '1px solid #eff0f2',
		borderRadius: '5px'
	}

};


const mapStateToProps = state => {

	const { displayText } = state.geolocation;

	return { displayText };

};


export default connect(mapStateToProps)(RecordComment);
