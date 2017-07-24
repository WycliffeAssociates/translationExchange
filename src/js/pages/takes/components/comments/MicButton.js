/**
 * Created by ericazhong on 7/21/17.
 */
import React, {Component} from 'react';
import RecordComment from './RecordComment';
import './RecordComment.css';
import {Button, Container, Grid, Header, Icon, Image, Modal, ModalHeader} from 'semantic-ui-react';
import Audio from "translation-audio-player";
import config from "../../../../../config/config";
import playlist from "/Users/ericazhong/Documents/8woc2017/src/js/pages/takes/components/songs/playlist.json"
import axios from "axios"
// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class MicButton extends Component {

    constructor(props){
        super(props);

        this.state = {title : 'Record Comment',

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

        this.setState({disabled:false});
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

    changeSaveButtonState (newState) {
        this.setState({SaveButtonState: newState});

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.state.show) {
            this.setState({show: true});
        }

    }

    createPlaylist() {
        // var files = this.props.comments;
        // files.map((file)=> file.comment.location);
        // var comments = [];
        // var playlist = [];
        //
        // for (var i=0;i<files.length; i++) {
        //     playlist.append({
        //         "src": files[i]
        //     });
        // }
        // comments["playlist"]=playlist;
        // comments.map((comment)=> <Audio
        //     width={600}
        //     height={300}
        //     playlist={playlist.playlist}
        //
        //     // store a reference of the audio component
        //     ref={audioComponent => { this.audioComponent = audioComponent; }}
        // />);
        // return comments
    }

    Style = {
        backgroundColor: "black",
        fontSize: "32",
        textAlign: "center",
        color: 'white',
        //width:"500px"

    };

    render(){
        return(

            <Modal
                open={this.state.show}
                size='small'
                style= {this.Style}
                dimmer= "inverted"
            >
                <Modal.Header style = {this.Style}>Comments</Modal.Header>
                <div>
                    <RecordComment ref={instance => (this.recordComment = instance) }
                                   changeSaveButtonState = {this.changeSaveButtonState}
                                   updateTakeInState={this.props.updateTakeInState}
                                   type="take"
                                   id = {this.props.take.id}

                    />

                </div>
                <Container className="commentsList">
                    <Grid columns={2}>

                        <Grid.Column width={13}>
                            <Audio
                                 width={600}
                                 height={300}
                                 playlist={playlist.playlist}

                                 // store a reference of the audio component
                                 ref={audioComponent => { this.audioComponent = audioComponent; }}
                             />

                        </Grid.Column>

                        <Grid.Column width={3}>
                            <Button icon negative>
                                <Icon name="trash"/>
                            </Button>
                            <Button onClick={this.hideModal} content="close"/>
                        </Grid.Column>
                    </Grid>

                </Container>

            </Modal>
        );
    }
}


export default MicButton;