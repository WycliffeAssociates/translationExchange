import React, {Component} from 'react';
import {Button, SplitButton, MenuItem, DropdownButton} from 'react-bootstrap';



class BookButton extends Component {

    constructor(props){
        super(props);

        this.state = { title: 'Select book',
                       buttonStyle: 'Default',
                       status: true


        };
    }


    render() {
        return (


            <div>
                <DropdownButton bsStyle={this.state.buttonStyle} title={this.state.title} disabled = {this.state.status} bsSize="large">
                    <MenuItem eventKey="1">Matthew</MenuItem>
                    <MenuItem eventKey="2">Mark</MenuItem>
                    <MenuItem eventKey="3" active>Luke</MenuItem>
                    <MenuItem eventKey="4">John</MenuItem>
                </DropdownButton>
            </div>

        );
    }
}
 export default BookButton;