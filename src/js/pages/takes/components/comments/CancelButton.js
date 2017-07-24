
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'semantic-ui-react';



class CancelButton extends Component{

    constructor(props){
        super(props);

        this.onButtonClicked = this.onButtonClicked.bind(this);

    }

    onButtonClicked(){
        console.log('Cancel button clicked');

    }



    render(){

    return  <Button>Cancel</Button>;



    }


}



export default CancelButton;

