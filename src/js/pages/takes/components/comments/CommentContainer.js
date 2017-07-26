import React, {Component} from 'react';
import RecordComment from './RecordComment';
import './RecordComment.css';
import {Button, Container, Grid, Header, Icon, Image, Modal, ModalHeader} from 'semantic-ui-react';
import Audio from "translation-audio-player";
import config from "../../../../../config/config";


// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class CommentContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Record Comment',

            show: this.props.open,
            SaveButtonState: true,
            blob: null,


        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

    }

    saveButton() {

        this.setState({disabled: false});
    }

    getInitialState() {
        return {show: false};
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    onClickCancel = () => {                         // used when you click the microphone button in the player
        this.recordComment.deleteBlob();
        this.hideModal();
        this.setState({SaveButtonState: true});

    };


    onClickSave = () => {
        this.hideModal();
        this.setState({SaveButtonState: true});

    };

    changeSaveButtonState(newState) {
        this.setState({SaveButtonState: newState});

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.show) {
            this.setState({show: true});
        }

    }

    createPlaylist(comment) {
        var file = [];
        file[0] = {
            "src": config.streamingUrl + comment.comment.location
        };

        return (
            <Grid columns={2}>
                <Grid.Column width={12}>
                    <Audio
                        width={600}
                        height={300}
                        playlist={file}
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button icon negative onClick={() => {
                        this.props.deleteComment(this.props.type, comment.comment.id, this.props.id)
                    }}>
                        <Icon name="trash"/>
                    </Button>
                </Grid.Column>
            </Grid>
        );

    }

    Style = {

        backgroundColor: 'black',

        fontSize: "32",
        color: 'white',
        textAlign: "center",
        //width:"500px"

    };

    render() {
        return (

            <Modal
                size='small'
                style={this.Style}
                closeIcon='close'
                trigger={<Button
                    color="pink"
                    floated='right'
                    ref={audioComponent => {
                        this.audioComponent = audioComponent;
                    }}
                    icon="microphone"
                    onClick={this.showModal}/>}
            >
                <Modal.Header style={this.Style}>Comments</Modal.Header>
                <div>
                    <RecordComment ref={instance => (this.recordComment = instance) }
                                   changeSaveButtonState={this.changeSaveButtonState}
                                   updateTakeInState={this.props.updateTakeInState}
                                   sendComment={this.getComment}
                                   onClickSave={this.props.onClickSave}
                                   type={this.props.type}
                                   id={this.props.id}

                    />

                </div>
                <Container className="commentsList">
                    <Grid columns={2}>

                        <Grid.Column width={13}>
                            {this.props.comments
                                ? this.props.comments.map(this.createPlaylist.bind(this))
                                : ""
                            }
                        </Grid.Column>

                        <Grid.Column width={3}>

                            <Button onClick={this.hideModal} content="close"/>
                        </Grid.Column>
                    </Grid>

                </Container>

            </Modal>
        );
    }
}


export default CommentContainer;


