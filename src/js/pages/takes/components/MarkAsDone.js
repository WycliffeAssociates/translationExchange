import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'semantic-ui-react'
import AudioComponent from './AudioComponent';
import config from "config/config";

// this is the page for one chapter

class MarkAsDone extends Component {
    checkReadyForExport() {
        let counter = 0;
        for (let i = 0; i < this.props.takes.length; i++) {
            if (this.props.takes[i].take.is_export) {
                counter += 1;
            }
        }
        if ((this.props.numChunks === counter) && counter !== 0)  {
            return true;
        }
        return false;
    }

    createExportPlaylist() {

        var file = [];
        var length = 0;


        for(let i = 0; i < this.props.takes.length; i++) {
            if (this.props.takes[i].take.is_export) {
                length += 1;
            }
        }

        for(let i = 0; i < this.props.takes.length; i++) {
            if (this.props.takes[i].take.is_export) {
                file[file.length] = {
                    "src": config.streamingUrl + this.props.takes[i].take.location,
                    "name": this.props.takes[i].take.mode + ' ' + this.props.takes[i].take.startv + ' ' + '(' + (file.length+1) + '/' + length + ')'
                }
            }
        }

        return file
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