/**
 * Created by ericazhong on 7/21/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RecordComment from './RecordComment';
import './RecordComment.css';
import { Button, Header, Image, Modal,ModalHeader } from 'semantic-ui-react';
import axios from 'axios';
import config from "../../../../../config/config";

// NOTE: (dmarchuk)
let onClickCancel;
let onClickSave;
let Style;

class MicButton extends Component {

    constructor(props){
        super(props);



        this.state = {title : 'Record Comment',

            show: this.props.open,
            SaveButtonState: true,
            blob: null,
            wholeblob: null,


        };


        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.changeSaveButtonState = this.changeSaveButtonState.bind(this);
        this.getComment=this.getComment.bind(this);
        this.onClickSave = this.onClickSave.bind(this);

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


    onClickSave = () => {
        this.hideModal();
        var reader  = new FileReader();

        reader.addEventListener("load", () => {
            console.log('reader', reader);
            console.log('y', reader.result);

            axios.post(config.apiUrl + 'comments/', {
                "location": reader.result,
                "user": 3,
                "file": this.props.take.id,

            }).then((results) => {
                //console.log(JSON.stringify(this.state.blob));
                //update this take in state using the update method in ChapterContainer
                console.log('uploaded successfully')
            });


        }, false);

        if (this.state.blob) {
            reader.readAsDataURL(this.state.blob);



        }
        // reader.readAsDataURL(this.state.blob);
        // this.state.wholeblob.blob = reader.result;
        // axios.post(config.apiUrl + 'comments/', {
        //         "location": reader.result,
        //         "user": 3,
        //         "file": this.props.take.id
        //
        //     }).then((results) => {
        //     console.log(JSON.stringify(this.state.blob));
        //         //update this take in state using the update method in ChapterContainer
        //       console.log('uploaded successfully')
        //     });

        this.setState({SaveButtonState: true});

    };

    changeSaveButtonState (newState) {
        this.setState({SaveButtonState: newState});

    }
    getComment(comment) {
        this.setState({
            wholeblob: comment,
            blob: comment.blob
        });
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
                                   updateTakeInState={this.props.updateTakeInState}
                                   sendComment={this.getComment}

                    />
                </div>

                <Modal.Actions style = {this.Style}>
                    <div className="buttons-container">
                        <Button className="SaveButton"
                                disabled={this.state.SaveButtonState}
                                positive icon='checkmark'
                                labelPosition='right'
                                content="Save"
                                onClick={this.onClickSave.bind(this)} />

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


export default MicButton;