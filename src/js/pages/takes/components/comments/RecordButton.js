import React, { Component } from "react";
import RecordComment from "./RecordComment";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "./RecordComment.css";
import CommentsPlayer from "../comments/commentsPlayer";
import {
    Button,
    Icon,
    Modal
} from "semantic-ui-react";
import config from "../../../../../config/config";
import {getAudioComments, resetComments} from '../../../../actions/index';

class RecordButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Record Comment",
            show: this.props.open,
            SaveButtonState: true,
            blob: null,
            //active: this.props.comments.length > 0,
            loadingActive: this.props.active,
            commentIndicator: false
        };
         this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
    }

    resetComments(){
       this.props.resetComments();
    }

    changeSaveButtonState() {
        this.setState({ commentIndicator: true });
    }

    getComments(){
        const type = this.props.type;
        const id = this.props.id;
        this.props.getAudioComments(id, `${type}_id`);
    }


    createPlaylist(comment) {
        const src = config.streamingUrl + comment.location;
        return (
			<div key={comment.id} style={styles.container}>

				<CommentsPlayer
					audioFile={src}
					playAudio={true}
				/>

				<div style={{ display: 'flex', alignSelf: 'center' }}>
					<Button
						icon
						negative
						onClick={() => {
                            if (window.confirm(this.props.displayText.deleteComment)) {
                                this.props.deleteComment(
                                    this.props.type,
                                    comment.id,
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
				onClose={this.resetComments.bind(this)}
				trigger={
					<Button
						active={this.state.active}
						color={ this.props.has_comments  ? "yellow" : null}
						ref={audioComponent => {
                            this.audioComponent = audioComponent;
                        }}
						icon="comment outline"
						onClick={this.getComments.bind(this)}
					/>
                }
			>
				<Modal.Header style={this.Style}>
                    {this.props.displayText.commentsOn} {this.props.type}{" "}
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


export default connect(mapStateToProps, mapDispatchToProps)(RecordButton);
