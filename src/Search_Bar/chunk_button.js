import React, {Component} from 'react';
import {Button, SplitButton, MenuItem, DropdownButton} from 'react-bootstrap';



class ChunkButton extends Component  {

    constructor(props){
        super(props);

        this.state = {title: 'Select Chunk',
                      buttonStyle: 'Default',
                      status: true

        };

    }

    render(){

    return(
        <div >
        <DropdownButton bsStyle={this.state.buttonStyle} title={this.state.title} disabled={this.state.status} bsSize = "large"  >
            <MenuItem eventKey="1">1</MenuItem>
            <MenuItem eventKey="2">3</MenuItem>
            <MenuItem eventKey="3">4</MenuItem>
            <MenuItem eventKey="4">7</MenuItem>

        </DropdownButton>
        </div>
    );
}
}

export default ChunkButton;