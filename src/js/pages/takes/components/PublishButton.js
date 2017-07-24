import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
let state;
let handleOpen;
let handleClose;

export default class PublishButton extends Component {
    state = { modalOpen: false };

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    });

    // called when the user clicks yes inside the modal
    publishFiles () {
        this.props.onPublish()
        this.handleClose()
    }

    checkReadyForPublish() {
        var counter = 0;
        this.props.chapters.map((i) => {
            if (i.exportReady) {counter+=1}
        });
        
        return counter > 0;
    }

    render() {
        let readyForPublish = this.checkReadyForPublish();
        // disabled={!readyForExport}>Publish</Button>}

        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}
                                 floated="right"
                                 disabled={false}>Publish</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon='close'
                size='small'

            >
                <Header icon='browser' content='Publish Project' />
                <Modal.Content>
                    <h3>Are you ready to publish this project?</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.publishFiles.bind(this)} inverted>
                        <Icon name='checkmark' />Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}