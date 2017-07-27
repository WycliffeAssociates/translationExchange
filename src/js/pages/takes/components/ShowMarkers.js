import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Icon} from "semantic-ui-react";


export class ShowMarkers extends Component{

    render(){
        return (
            <Button icon color={this.props.showMarkersColor} onClick={this.props.onClick}>
                <Icon name='bookmark' size="large"/>
            </Button>
        );
    }
}

export default ShowMarkers;