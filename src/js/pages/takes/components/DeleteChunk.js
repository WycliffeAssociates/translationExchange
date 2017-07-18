/**
 * Created by DennisMarchuk on 7/12/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Button} from "semantic-ui-react";
import { Icon } from 'semantic-ui-react'
import config from 'config/config';
import axios from 'axios'
import Take from "./Take";



export class DeleteChunk extends Component{

        render(){
            return (
                <Button icon color="red" onClick={this.deleteTake.bind(this)}>
                    <Icon name='trash' size="large"/>
                </Button>


            );
        }
    deleteTake(){
        console.dir(this.props)
        axios.delete(config.apiUrl + 'takes/' + this.props.takeId + '/')
        this.props.deleteTakeFromState(this.props.takeId)
    }
}

DeleteChunk.propTypes = {
    takeId: PropTypes.number.isRequired
};

export default DeleteChunk

//this.props.take.take.id
