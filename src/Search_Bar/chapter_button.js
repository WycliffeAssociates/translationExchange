import React, {Component} from 'react';
import {Button, SplitButton, MenuItem, DropdownButton} from 'react-bootstrap';



class ChapterButton extends Component {

   constructor(props){
       super(props);

       this.state = {title: 'Select Chapter',
                     buttonStyle: 'Default',
                     status: true                            };

   }

render(){
    return(
        <div className="chapterButton">
        <DropdownButton bsStyle={this.state.buttonStyle} title={this.state.title} disabled ={this.state.status} bsSize = "large" >
            <MenuItem eventKey="1">1</MenuItem>
            <MenuItem eventKey="2">2</MenuItem>
            <MenuItem eventKey="3">3</MenuItem>


        </DropdownButton>
        </div>
    );
}

}

export default ChapterButton;