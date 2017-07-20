

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecordComment from './RecordComment';
import './RecordComment.css';
import { Button, Header, Image, Modal,ModalHeader } from 'semantic-ui-react';

// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class CommentContainer extends Component {

    constructor(props){
        super(props);



        this.state = {title : 'Record Comment',
            show: this.props.open,
            SaveButtonState: true


        };


        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.changeSaveButtonState = this.changeSaveButtonState.bind(this);

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

    onClickSave = () =>{
        this.hideModal();
        // save and upload audio comment to the server
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

    Style = {
        backgroundColor: "rgba(171,149,149, .4)",
        fontSize: "32",
        textAlign: "center",
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
                    <Modal.Header style = {this.Style}>Record Audio Comment</Modal.Header>
                    <div>
                        <RecordComment ref={instance => (this.recordComment = instance) }
                                       changeSaveButtonState = {this.changeSaveButtonState}

                        />
                    </div>

                    <Modal.Actions style = {this.Style}>
                        <div className="buttons-container">
                            <Button className="SaveButton"
                                    disabled={this.state.SaveButtonState}
                                    positive icon='checkmark'
                                    labelPosition='right'
                                    content="Save"
                                    onClick={this.onClickSave} />

                            <Button  className="CancelButton"
                                     negative icon='remove'
                                     labelPosition='right'
                                     content="Cancel"
                                     onClick={this.onClickCancel}/>
                        </div>

                    </Modal.Actions>
                </Modal>

        );
    }
}


export default CommentContainer;


