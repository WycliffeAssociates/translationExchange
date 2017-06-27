import React from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';



const ChunkButton = () => {

    const text = 'Select Chunk';
    const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
    const buttonStyle = 'Default';
    const state = true;


    return(

        <SplitButton bsStyle={buttonStyle} title={text} bsSize="large"  disabled = {state}   >
            <MenuItem eventKey="1">1</MenuItem>
            <MenuItem eventKey="2">3</MenuItem>
            <MenuItem eventKey="3">4</MenuItem>
            <MenuItem eventKey="4">7</MenuItem>

        </SplitButton>

    );
}

export default ChunkButton;