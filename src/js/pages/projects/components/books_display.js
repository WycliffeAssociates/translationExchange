/**
 * Created by DennisMarchuk on 7/7/2017.
 */

import React, { Component } from 'react';
import {Button, Col, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import axios from 'axios'
import {Dropdown} from "semantic-ui-react";
import {languageOptions} from "./common";
import config from 'config/config';


class BooksDisplay extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {loaded: false, error: "", projects:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */

    componentDidMount() {
        this.setState({error: ""});
        axios.get(config.apiUrl + 'books/'
        ).then(results => {
            this.setState({
                loaded: true,
                projects: results.data
            })
        }).catch(exception => {
            this.setState({error: exception});
        });
    }


    /*
     In render, just render a child presentation component, passing it
     the data as props
     */
    render () {
        return (
            <div>
                <Dropdown text='Select Book'
                          search
                          floating
                          labeled
                          button
                          className='icon'
                          icon='comments outline'
                          options={languageOptions}
                />
            </div>
        );
    }
}

export default BooksDisplay;