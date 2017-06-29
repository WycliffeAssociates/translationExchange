import React from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';



const BookButton = () => {

    const text = 'Select Book';
    const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
    const buttonStyle = 'Default';
    const state = true;


    return(

        <SplitButton bsStyle={buttonStyle} title={text} bsSize="large"   disabled = {state} >
            <MenuItem eventKey="1">Matthew</MenuItem>
            <MenuItem eventKey="2">Mark</MenuItem>
            <MenuItem eventKey="3">Luke</MenuItem>
            <MenuItem eventKey="4">John</MenuItem>

        </SplitButton>

    );
}

 export default BookButton;