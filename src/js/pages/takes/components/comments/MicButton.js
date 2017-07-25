/**
 * Created by ericazhong on 7/21/17.
 */
import React, {Component} from 'react';
import RecordComment from './RecordComment';
import './RecordComment.css';
import {Button, Container, Grid, Header, Icon, Image, Modal, ModalHeader} from 'semantic-ui-react';
import Audio from "translation-audio-player";
import config from "../../../../../config/config";
import axios from "axios"
// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class MicButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Record Comment',

            show: this.props.open,
            SaveButtonState: true,
            blob: null,
            comments: this.props.comments
        };


        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);

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
                        ref={audioComponent => {
                            this.audioComponent = audioComponent;
                        }}
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button icon negative>
                        <Icon name="trash"/>
                    </Button>
                </Grid.Column>
            </Grid>
        );

    }

    Style = {
        backgroundColor: "black",
        fontSize: "32",
        textAlign: "center",
        color: 'white',
        //width:"500px"

    };

    render() {

        return (

            <Modal
                open={this.state.show}
                size='small'
                style={this.Style}
                dimmer="inverted"
            >
                <Modal.Header style={this.Style}>Comments</Modal.Header>
                <div>
                    <RecordComment ref={instance => (this.recordComment = instance) }
                                   changeSaveButtonState={this.changeSaveButtonState}
                                   type="take"
                                   id={this.props.take.id}
                                   onClickSave={this.props.onClickSave}


                    />

                </div>
                <Container className="commentsList">
                    <Grid columns={2}>

                        <Grid.Column width={13}>
                            {this.props.comments
                                ? this.props.comments.map(this.createPlaylist)
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


export default MicButton;