import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Button, Icon, Modal } from 'semantic-ui-react'
import AudioPlayer from './audioplayer/AudioPlayer';
import CommentsPlayer from '../components/comments/commentsPlayer.js'
import config from "config/config";
import axios from 'axios';


let handleOpen;
let handleClose;
// this is the page for one chapter

class MarkAsDone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            playList: null,
            pointer: 0
        }
        this.playNext = this.playNext.bind(this);
    }


    checkReadyForExport() {
        if (this.props.chunks.length === 0) {
            return false;
        } else {
            //true if every chunk has at least 1 take marked is_publish
            return this.props.chunks.every((chunk) => {
                return chunk.takes.some(take => take.take.is_publish);
            });
        }
    }

    createExportPlaylist() {
        let length = this.props.chunks.length;
        let playlist = [];

        this.props.chunks.map((chunk) => {
            chunk.takes.map((take) => {
                if (take.take.is_publish) {
                    playlist.push({
                        "src": config.streamingUrl + take.take.location,
                        "name": this.props.mode + ' ' + chunk.startv + ' (' + (playlist.length + 1) + '/' + length + ')'
                    });

                }
            })
        });

        return playlist;
    }

    changeColor() {
        this.props.onMarkedAsPublish(() => {
            this.handleClose();
        });

    }

    handleOpen = (e) => {
        const playList = this.createExportPlaylist();
        this.setState({ playList, modalOpen: true });
    }

    handleClose = (e) => this.setState({ modalOpen: false });

    playNext(check) {
        if (check) {

            const playlistLength = this.state.playList.length;
            const pointer = this.state.pointer;

            if (playlistLength > 1 && pointer < playlistLength - 1) {
                this.setState({ pointer: this.state.pointer + 1 });

            } else {
                this.setState({ pointer: 0 })
            }
        }

    }



    audioPlayer() {
        if (this.state.modalOpen) {
            return (
                <div style={{ display: 'flex' }}>
                    <div style={styles.audioPlayer}>
                        <CommentsPlayer
                            //audioFile = "http://172.19.145.91/media/dump/1501176679.73d99dfff8-5117-4635-b734-65140995db67/mrk/07/chapter.wav"
                            audioFile={this.state.playList[this.state.pointer].src}
                            playNext={this.playNext}
                            loop={true}
                            pointer={this.state.pointer}
                            length={this.state.playList.length}
                        />
                    </div>
                    <div style={styles.nameContainer}>
                        {this.state.playList[this.state.pointer].name}
                    </div>
                </div>);
        }
        else {
            return ''
        }
    }


    exportButton() {
        let disableBtn = this.props.chapter.is_publish;

        let crfe = this.checkReadyForExport();

        let disableBtnState = true;

        if (disableBtn & crfe) {
            disableBtnState = true;
        } else if (crfe) {
            disableBtnState = false;
        }
        console.log("disableBtn", disableBtn);
        console.log("crfe", crfe);
        console.log("disableBtnState", disableBtnState);
        return (
            <Button onClick={this.handleOpen}
                color={disableBtn === true ? "green" : ""}
                disabled={false}
                className="icon"
                icon="share"
                floated="right">
                <Icon color="white" name="sidebar" />
            </Button>
        );

    }


    render() {
        return (
            <Modal trigger={this.exportButton()}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon="close">
                <Modal.Header style={styles.modal}>You are ready to mark Chapter {this.props.chapter.number} as finished!</Modal.Header>
                <Modal.Content style={styles.modal}>
                    <Modal.Description style={styles.modal}>
                        <p>Here is a preview of the takes you have selected to export. This may take a few seconds to
                                load.</p>
                        <p>To mark as done, click on 'Export'.</p>
                        {this.audioPlayer()}
                    </Modal.Description>

                </Modal.Content>
                <Modal.Actions style={styles.modal}>
                    {/*this button will do a call to database to change chapter.exportready to true */}
                    <Button content="Export" onClick={this.changeColor.bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }
}

MarkAsDone.propTypes = {
    chapter: PropTypes.number.isRequired,
    chunks: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired
};

const styles = {
    modal: {
        backgroundColor: '#000',
        color: '#fff'

    },
    audioPlayer: {
        border: '1px solid white',
        borderRadius: 5,
        display: 'inline-block',
        width: '80%'
    },
    nameContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'

    }
}


export default MarkAsDone;
