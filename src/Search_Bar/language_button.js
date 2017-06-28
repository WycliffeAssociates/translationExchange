import React, {Component} from 'react';
import {Button, SplitButton, Modal, ButtonToolbar, MenuItem} from 'react-bootstrap';
import ProjectsListContainer from './ProjectListContainer'



class LanguageButton extends Component {

    constructor(props){
        super(props);



        this.state = {title : 'Language',
                      buttonStyle: 'success',
                      show: false
        };


        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.getInitialState = this.getInitialState.bind(this);

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



render(){




    return(


        <ButtonToolbar>
            <Button bsStyle={this.state.buttonStyle} onClick={this.showModal} bsSize="lg">
                Languages
            </Button>

            <Modal
                {...this.props}
                show={this.state.show}
                onHide={this.hideModal}
                dialogClassName="custom-modal"
            >


                   <ProjectsListContainer/>



            </Modal>
        </ButtonToolbar>


    ); }
}










export default LanguageButton;

