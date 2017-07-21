import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ExportButton extends Component {
    state = { modalOpen: false };

    handleOpen = (e) => this.setState({
        modalOpen: true,
    });

    handleClose = (e) => this.setState({
        modalOpen: false,
    });

    checkReadyForExport() {
        var counter = 0;
        this.props.chapters.map((i) => {
            if (i.exportReady) {counter+=1}
        });
        
        return counter > 0;
    }

    render() {
        let readyForExport = this.checkReadyForExport();

        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}
                                 floated="right"
                                 disabled={!readyForExport}>Publish</Button>}
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
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Yes
                        {/*this button should trigger a call to the database to publish*/}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}