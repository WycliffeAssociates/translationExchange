import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';



class SaveButton extends Component{

    constructor(props){
        super(props);

    this.onButtonClicked = this.onButtonClicked.bind(this);

    }

    onButtonClicked(){

        console.log('Save button clicked');


    }



    render(){

        return <Button>Save</Button> ;



    }


}

export default SaveButton;