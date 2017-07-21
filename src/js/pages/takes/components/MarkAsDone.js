import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'semantic-ui-react'
import AudioComponent from './AudioComponent';
import config from "config/config";

// this is the page for one chapter

class MarkAsDone extends Component {
    checkReadyForExport() {
        var counter = 0;
        this.props.takes.map((i) => {
            if (i.take.is_export) {counter+=1}
        })

        if ((this.props.numChunks === counter) && counter !== 0) {
            return true
        }
        else {return false}
    }

    createExportPlaylist() {

        var length = 0;
        this.props.takes.map((i) => {
            if(i.take.is_export) {length += 1}
        })

        var playlist = [];
        this.props.takes.map((i) => {
            if (i.take.is_export) {
                playlist[playlist.length] = {
                    "src": config.streamingUrl + i.take.location,
                    "name": i.take.mode + ' ' + i.take.startv + ' (' + (playlist.length+1) + '/' + length + ')'
                }
            }
        })
        return playlist
    }

    render () {
        let readyForExport = this.checkReadyForExport();

        return (
            <Modal trigger={<Button disabled={!readyForExport} content="Mark Chapter as Done" icon="share" floated="right" labelPosition="right"/>} closeIcon="close">
                <Modal.Header>Review and Finish</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>You are ready to mark Chapter {this.props.chapter} of {this.props.book} as finished!</p>
                        <p>Here is a preview of the takes you have selected to export. This may take a few minutes to load</p>
                        <p>To mark as done, click on 'Finish'</p>

                        <AudioComponent
                            playlist={this.createExportPlaylist()}
                        />
                    </Modal.Description>

                </Modal.Content>
                <Modal.Actions>
                    <Button content="Finish" onClick={() => alert('insert function to export here')}/>
                </Modal.Actions>
            </Modal>
        );
    }
}

MarkAsDone.propTypes = {
    chapter: PropTypes.number.isRequired,
    book: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    takes: PropTypes.array.isRequired,
    numChunks: PropTypes.number.isRequired
};

export default MarkAsDone;