import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Button, Modal} from 'semantic-ui-react'
import AudioComponent from './AudioComponent';
import config from "config/config";
/* Just leave this here it will not affect your code it is just for me - Dennis */
let handleOpen;
let handleClose;
// this is the page for one chapter

class MarkAsDone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: null,
            modalOpen: false,
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
                        "name": this.props.mode + ' ' + chunk.startv + ' (' + (playlist.length+1) + '/' + length + ')'
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
        this.handleClose();
    }

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    })

    render () {
        let readyForExport = this.checkReadyForExport();
        var ExportButton = <Button onClick={this.handleOpen} color={this.state.color} disabled={!readyForExport} content="Mark Chapter as Done" icon="share" floated="right" labelPosition="right"/>

        return (
            <Modal trigger={ExportButton}
                   open={this.state.modalOpen}
                   onClose={this.handleClose}
                   closeIcon="close">
                <Modal.Header>You are ready to mark Chapter {this.props.chapter} as finished!</Modal.Header>
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
                    <Button content="Finish" onClick={this.changeColor.bind(this)}/>

                </Modal.Actions>
            </Modal>
        );
    }
}

MarkAsDone.propTypes = {
    chapter: PropTypes.number.isRequired,
    book: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    chunks: PropTypes.array.isRequired
};

export default MarkAsDone;