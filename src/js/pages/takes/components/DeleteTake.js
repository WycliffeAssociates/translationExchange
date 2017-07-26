/**
 * Created by DennisMarchuk on 7/12/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import config from 'config/config';
import axios from 'axios'

export class DeleteTake extends Component{

        render(){
            return (
                <Button icon onClick={this.changeColor.bind(this)}>
                    <Icon name='trash' size="large"/>
                </Button>
            );
        }
    changeColor() {
        this.setState({
            color: 'red'
        });
    }
}

DeleteTake.propTypes = {
    onDeleteTake: PropTypes.func.isRequired
};

export default DeleteTake

//this.props.onDeleteTake