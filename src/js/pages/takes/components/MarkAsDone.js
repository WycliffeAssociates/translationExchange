import React, {Component} from 'react';
import PropTypes from "prop-types";
import { Button, Modal } from 'semantic-ui-react'
import AudioComponent from './AudioComponent';
import config from "config/config";
/* Just leave this here it will not affect your code it is just for me - Dennis */
let handleOpen;
let handleClose;
// this is the page for one chapter

class MarkAsDone extends Component {

    constructor(props){
        super(props);
        this.state = {
            color: null,
            modalOpen: false,
        }

    }
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
        });
        return playlist
    }
    changeColor(){
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

        return(
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
    takes: PropTypes.array.isRequired,
    numChunks: PropTypes.number.isRequired
};

export default MarkAsDone;