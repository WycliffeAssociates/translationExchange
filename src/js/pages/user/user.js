import React, { Component } from 'react';
import { Button, Header, Image, Modal, Container, Segment, Grid, Form, Table, Divider, Label } from 'semantic-ui-react'
import 'css/home.css'
import hands from 'images/hands.png'
import axios from 'axios'
import config from 'config/config'
import QueryString from 'query-string';
import trap from '/Users/nathanalbers/Documents/Programs/Github/8woc2017/src/images/trap.svg'
import logo from 'images/logo.png'

class User extends Component {

    render() {

        return(

            <div>
                This is the user page.
            </div>

        );
    }
}

export default User;