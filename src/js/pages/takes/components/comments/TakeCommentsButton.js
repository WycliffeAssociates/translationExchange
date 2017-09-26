import React, { Component } from "react";
import { connect } from "react-redux";
import RecordComment from "./RecordComment";
import "./RecordComment.css";
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
		var file = [];
		file[0] = {
			src: config.streamingUrl + comment.comment.location
		};

		return (
			<Grid columns={2}>
				<Grid.Column width={12}>
					<Audio
						width={600}
						height={300}
						playlist={file}
						ref={audioComponent => {
							this.audioComponent = audioComponent;
						}}
					/>
				</Grid.Column>
				<Grid.Column width={2}>
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
				</Grid.Column>
			</Grid>
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
					{this.props.language.commentsOn} {this.props.count}, {this.props.language.chunk} {this.props.chunkNumber}{" "}
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
				<Container className="commentsList">
					<Grid columns={1}>
						<Grid.Column width={13}>
							{this.props.comments
								? this.props.comments.map(this.createPlaylist.bind(this))
								: ""}
						</Grid.Column>
					</Grid>
				</Container>
			</Modal>
		);
	}
}


const mapStateToProps = state => {

const{ language } = state.geolocation;

return{language};

};


export default connect (mapStateToProps) (TakeCommentsButton);
