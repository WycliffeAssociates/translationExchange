/**
 * Created by DennisMarchuk on 7/19/2017.
 */
/* global options*/

import { Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'


export class CheckingLevel extends Component {

    options = [
        {key: 0, text: '0', value: 0},
        {key: 1, text: '1', value: 1},
        {key: 2, text: '2', value: 2},
        {key: 3, text: '3', value: 3},
    ];

    render(){
        return(
            (
                <Menu compact>
                    <Dropdown text={this.options} options={this.options} simple item/>
                </Menu>
            )
        );
    }
}

export default CheckingLevel