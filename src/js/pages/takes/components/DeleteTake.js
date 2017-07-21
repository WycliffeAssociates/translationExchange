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
                <Button icon color="red" onClick={this.props.onDeleteTake}>
                    <Icon name='trash' size="large"/>
                </Button>
            );
        }
}

DeleteTake.propTypes = {
    onDeleteTake: PropTypes.func.isRequired
};

export default DeleteTake