import React from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';



const ChapterButton = () => {

    const text = 'Select Chapter';
    const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
    const buttonStyle = 'default';
    const state = true;


    return(

        <SplitButton bsStyle={buttonStyle} title={text} bsSize="large"   disabled = {state} >
            <MenuItem eventKey="1">Spanish</MenuItem>
            <MenuItem eventKey="2">English</MenuItem>
            <MenuItem eventKey="3">Russian</MenuItem>


        </SplitButton>

    );
}

export default ChapterButton;