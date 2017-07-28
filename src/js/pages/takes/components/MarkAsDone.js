import React, {Component}
from 'react';
import PropTypes from "prop-types";
import {Button, Icon, Modal}
from 'semantic-ui-react'
        import AudioComponent from './AudioComponent';

import config from "config/config";
import axios from 'axios';
let handleOpen;
let handleClose;
// this is the page for one chapter

class MarkAsDone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: null,
            modalOpen: false,
            is_published: this.props.chapter.is_publish,
        }

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
        var playlist = [];
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
        return playlist
    }

    changeColor() {
        this.setState({
            color: 'green'
        });
        let parameters = {"is_publish": true}
//make patch request to confirm that the chapter is ready to be published
        axios.patch(config.apiUrl + 'chapters/' + this.props.chapter.id + "/", parameters)
                .then((response) => {
                    this.setState({is_published: true});
                    this.changeColor();
                    console.log(response)
                }).catch((exception) => {
            console.log(exception);
        });
        this.handleClose();
    }

    handleOpen = (e) => this.setState({
            modalOpen: true,
        }
        );
            handleClose = (e) => this.setState({
            modalOpen: false,
        }
        )

    render() {
        let disableBtn = this.state.is_published;
        let crfe = this.checkReadyForExport();
        let disableBtnState;
        if (disableBtn === crfe) {
            disableBtnState = true;
        } else if (crfe) {
            disableBtnState = false;
        }
        var ExportButton = <Button onClick={this.handleOpen}
                color={disableBtn === true ? "green" : this.state.color}
                disabled={disableBtnState}
                className="icon"
                icon="share"
                floated="right">
            <Icon color="white" name="sidebar"/>
        </Button>;
        return (
                <Modal trigger={ExportButton}
                       open={this.state.modalOpen}
                       onClose={this.handleClose}
                       closeIcon="close">
                    <Modal.Header>You are ready to mark Chapter {this.props.chapter.number} as finished!</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>Here is a preview of the takes you have selected to export. This may take a few seconds to
                                load.</p>
                            <p>To mark as done, click on 'Finish'.</p>
                            <AudioComponent
                                width={850} playlist={this.createExportPlaylist()}
                                />
                        </Modal.Description>
                
                    </Modal.Content>
                    <Modal.Actions>
                        {/*this button will do a call to database to change chapter.exportready to true */}
                        <Button content="Finish" onClick={this.changeColor.bind(this)} />
                
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
export default MarkAsDone;