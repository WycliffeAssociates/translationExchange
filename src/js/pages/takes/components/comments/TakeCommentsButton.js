import React, { Component } from "react";
import { connect } from "react-redux";
import RecordComment from "./RecordComment";
import "./RecordComment.css";
import CommentsPlayer from "../comments/commentsPlayer";
import {
	Button,
	Container,
	Grid,
	Icon,
	Modal,

} from "semantic-ui-react";
import Audio from "translation-audio-player";
import config from "../../../../../config/config";



class TakeCommentsButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			//title: "Record Comment",
			show: this.props.open,
			SaveButtonState: true,
			blob: null,
			active: this.props.comments.length > 0
		};

		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.getInitialState = this.getInitialState.bind(this);
		this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	saveButton() {
		this.setState({ disabled: false });
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

	onClickDelete(commentid, takeid) {
		this.props.deleteComment("take", commentid, takeid);
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

		const src = config.streamingUrl + comment.comment.location

		return (
			<div style = {styles.container}>

					<CommentsPlayer
						audioFile = {src}
						playAudio = {true}
																 />

          <div>
					<Button
						icon
						fluid
						negative
						onClick={() => {
							if (window.confirm(this.props.language.deleteComment)) {
								this.onClickDelete(comment.comment.id, this.props.take.id);
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
	};

	render() {
		return (
			<Modal
				size="small"
				style={this.Style}
				closeIcon="close"
				trigger={
					<Button
						fluid
						ref={audioComponent => {
							this.audioComponent = audioComponent;
						}}
						onClick={this.showModal}
						active={this.state.active}
						color={this.state.active ? "yellow" : null}
					>
						<Icon name="comment outline" />
					</Button>
				}
			>
				<Modal.Header style={this.Style}>
					{this.props.language.commentsOnTake} {this.props.count}, {this.props.language.chunk} {this.props.chunkNumber}{" "}
				</Modal.Header>
				<div>
					<RecordComment
						ref={instance => (this.recordComment = instance)}
						changeSaveButtonState={this.changeSaveButtonState}
						type="take"
						id={this.props.take.id}
						onClickSave={this.props.onClickSave}
						loadingActive={this.props.loadingActive}
					/>
				</div>
				<div style = {{display:'flex', justifyContent:'center', marginTop:'2%', marginBottom:'2%', maxHeight: 350, overflowY: 'scroll' }}>
					<div style = {{width:'95%', marginTop:'1%' } }>

							{this.props.comments
								? this.props.comments.map(this.createPlaylist.bind(this))
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

const{ language } = state.geolocation;

return{language};

};


export default connect (mapStateToProps) (TakeCommentsButton);
