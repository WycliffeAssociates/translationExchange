import React, {Component} from 'react'
import {Button, Modal} from 'semantic-ui-react'
import AudioComponent from './AudioComponent'

class ExportModal extends Component {

    render() {

        var ExportButton = <Button disabled={false} content="Mark Chapter as Done" icon="share" floated="right" labelPosition="right"/>

        return(
            <Modal trigger={ExportButton} closeIcon="close">
                <Modal.Header>You are ready to mark Chapter 6 as finished!</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>Here is a preview of the takes you have selected to export. This may take a few seconds to
                            load.</p>
                        <p>To mark as done, click on 'Finish'.</p>
                        <AudioComponent
                            width={850} playlist={this.props.playlist}
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

export default ExportModal