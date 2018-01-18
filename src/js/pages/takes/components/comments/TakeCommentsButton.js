import React, { Component } from "react";
import { connect } from "react-redux";
import RecordComment from "./RecordComment";
import { bindActionCreators } from 'redux';
import "./RecordComment.css";
import CommentsPlayer from "../comments/commentsPlayer";
import {
	Button,
	Icon,
	Modal,

} from "semantic-ui-react";
import config from "../../../../../config/config";
import Notifications from 'react-notify-toast';
import {getAudioComments, resetComments} from '../../../../actions/index';



class TakeCommentsButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			SaveButtonState: true,
			blob: null,
		  //active: this.props.comments.length > 0
			comments: this.props.comments
		};


		this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	resetComments(){
		  this.props.resetComments();
		}

	getComments(){
	  const takeId = this.props.take.id
		this.props.getAudioComments(takeId, 'take_id');
	}

	onClickSave = () => {
		this.hideModal();
		this.setState({ SaveButtonState: true });
	};

	changeSaveButtonState(newState) {
		this.setState({ SaveButtonState: newState });
	}

	onClickDelete(commentid, takeid) {
		this.props.deleteComment("take", commentid, takeid, );
	}

	createPlaylist(comment) {
		const src = config.streamingUrl + comment.location;

		return (
			<div style={styles.container}>

				<CommentsPlayer
					audioFile={src}
					playAudio={true}
				/>

				<div style={{ display: 'flex', alignSelf: 'center' }}>
					<Button
						icon
						fluid
						negative
						onClick={() => {
							if (window.confirm(this.props.displayText.deleteComment)) {
								this.onClickDelete(comment.id, this.props.take.id);
							}
						}}
					>
						<Icon name="trash" />
					</Button>
				</div>
				<Notifications />
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
				onClose={this.resetComments.bind(this)}
				trigger={
					<Button
						fluid
						ref={audioComponent => {
							this.audioComponent = audioComponent;
						}}
						onClick={this.getComments.bind(this)}
						active={this.state.active}
						color={this.props.has_comments ? "yellow" : null}
					>
						<Icon name="comment outline" />
					</Button>
				}
			>
				<Modal.Header style={this.Style}>
					{this.props.displayText.commentsOnTake} {this.props.count}, {this.props.displayText.chunk} {this.props.chunkNumber}{" "}
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
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', marginBottom: '2%', maxHeight: 350, overflowY: 'scroll' }}>
					<div style={{ width: '95%', marginTop: '1%' }}>

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
	container: {
		width: '100%',
		display: 'flex',
		border: '1px solid white',
		borderRadius: 5,
		marginBottom: 4
	}
};

const mapDispatchToProps = dispatch => {
  	return bindActionCreators({  getAudioComments, resetComments  }, dispatch);
};


const mapStateToProps = state => {
	const {comments} = state.chunkListContainer;
	const { displayText } = state.geolocation;

	return { displayText, comments };

};


export default connect(mapStateToProps, mapDispatchToProps)(TakeCommentsButton);
