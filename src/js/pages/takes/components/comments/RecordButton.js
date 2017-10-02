import React, { Component } from "react";
import RecordComment from "./RecordComment";
import { connect } from "react-redux";
import "./RecordComment.css";
import CommentsPlayer from "../comments/commentsPlayer";
import {
	Button,
	Container,
	Grid,
	Header,
	Icon,
	Image,
	Modal,
	ModalHeader
} from "semantic-ui-react";
import Audio from "translation-audio-player";
import config from "../../../../../config/config";

// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class RecordButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "Record Comment",
			show: this.props.open,
			SaveButtonState: true,
			blob: null,
			active: this.props.comments.length > 0,
			loadingActive: this.props.active,
			comments: ''
		};

		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.getInitialState = this.getInitialState.bind(this);
		this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	getInitialState() {
		return { show: false };
	}

	showModal() {
		this.setState({ show: true });
	}

	hideModal() {
		this.setState({ show: false });
	}

	onClickSave = () => {
		this.hideModal();
		this.setState({ SaveButtonState: true });
	};

	changeSaveButtonState(newState) {
		this.setState({ SaveButtonState: newState });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.comments.length > 0) {
			this.setState({
				active: true
			});
		} else {
			this.setState({
				active: false
			});
		}
	}









	createPlaylist(comment) {

		const src = config.streamingUrl + comment.comment.location;

		return (
			<div key ={comment.comment.id} style = {styles.container}>

					<CommentsPlayer
						audioFile = {src}
						playAudio = {true}
																 />

          <div style ={{display:'flex', alignSelf:'center'}}>
					<Button
						icon
						negative
						onClick={() => {
							if (window.confirm(this.props.displayText.deleteComment)) {
								this.props.deleteComment(
									this.props.type,
									comment.comment.id,
									this.props.id
								);
							}
						}}
					>
						<Icon name="trash" />
					</Button>
        </div>
			</div>
		);
	}

	Style = {
		backgroundColor: "black",
		fontSize: "32",
		color: "white",
		textAlign: "center"
		//width:"500px"
	};

	render() {



		return (
			<Modal
				size="small"
				style={this.Style}
				closeIcon="close"
				trigger={
					<Button
						active={this.state.active}
						color={this.state.active ? "yellow" : null}
						ref={audioComponent => {
							this.audioComponent = audioComponent;
						}}
						icon="comment outline"
						onClick={this.props.onClick}
					/>
				}
			>
				<Modal.Header style={this.Style}>
					{this.props.displayText.commentsOn} {this.props.languagefrmAPI} {this.props.type}{" "}
					{this.props.number}{" "}
				</Modal.Header>

					<RecordComment
						ref={instance => (this.recordComment = instance)}
						changeSaveButtonState={this.changeSaveButtonState}
						updateTakeInState={this.props.updateTakeInState}
						sendComment={this.getComment}
						onClickSave={this.props.onClickSave}
						type={this.props.type}
						id={this.props.id}
						loadingActive={this.props.loadingActive}
					/>

				<div style = {{display:'flex', justifyContent:'center', marginTop:'2%', marginBottom:'2%', maxHeight: 350, overflowY: 'scroll' }}>
					<div style = {{width:'95%', marginTop:'1%' } }>

						{this.props.comments.length > 0
							? this.props.comments.slice(0).reverse().map(this.createPlaylist.bind(this))
							: ""}

					</div>
				</div>
			</Modal>
		);
	}
}

const styles = {
  container:{
		width: '100%',
		display: 'flex',
		border: '1px solid white',
		borderRadius: 5,
		marginBottom: 4
  }
};



const mapStateToProps = state => {

		const{ displayText } = state.geolocation;

		return{displayText};

};


export default connect (mapStateToProps) (RecordButton);
