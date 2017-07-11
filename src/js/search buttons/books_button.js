/**
 * Created by DennisMarchuk on 7/7/2017.
 */

import React, {Component} from 'react';
import {Button, SplitButton, Modal, ButtonToolbar, MenuItem, Col} from 'react-bootstrap';
import BooksDisplay from "./books_display";


class BooksButton extends Component {

    constructor(props){
        super(props);



        this.state = {title : 'Books',
            buttonStyle: 'default',
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
                    Books
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <BooksDisplay/>


                </Modal>
            </ButtonToolbar>


        ); }
}


export default BooksButton;