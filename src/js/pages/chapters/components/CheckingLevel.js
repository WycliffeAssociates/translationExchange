/**
 * Created by DennisMarchuk on 7/19/2017.
 */
/* global options*/

import { Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'
import axios from 'axios';
import config from "../../../../config/config";
import ProjectContainer from "../ProjectContainer"


var checkNum;
export class CheckingLevel extends React.Component {

    options = [
        {key: 0, text: '0', value: 0},
        {key: 1, text: '1', value: 1},
        {key: 2, text: '2', value: 2},
        {key: 3, text: '3', value: 3},
    ];

    setValue(event, data){
        console.log(data.value)
        this.props.setCheckingLevel(data.value);
    }

    render() {


        //console.log(this.props.num)

        return (
            (
                <Menu compact>
                    <Dropdown options={this.options} value={this.props.num} onChange={this.setValue.bind(this)} simple item/>
                </Menu>
            )
        );
    }
}//you can use value too

class ServerAns extends React.Component{
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        );
    }
}




export default CheckingLevel

// <Dropdown text={this.options} options={this.options} simple item/>