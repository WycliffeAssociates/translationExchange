import React, {Component} from 'react';
import {Button, SplitButton, MenuItem} from 'react-bootstrap';



const LanguageButton = () => {

    const text = 'Select Book';
    const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
    const buttonStyle = 'success';
    const state = false;


    return(

        <SplitButton bsStyle={buttonStyle} title={text} bsSize="large"   disabled = {state} >
            <MenuItem eventKey="1">Spanish</MenuItem>
            <MenuItem eventKey="2">English</MenuItem>
            <MenuItem eventKey="3">Russian</MenuItem>


        </SplitButton>

    );
}








// class LanguageButton extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {toggle: true};
//         this.eventHandler = this.eventHandler.bind(this);
//     }
//     eventHandler(event) {
//         this.setState((prevState) => ({
//                 toggle: !prevState.toggle
//             })
//         );
//     }
//     render() {
//         return(
//             <div>
//                 <button onClick={this.eventHandler}>{this.state.toggle ? 'Click Me' : 'Reset'}</button>
//             </div>
//         );
//     }
// }

export default LanguageButton;

