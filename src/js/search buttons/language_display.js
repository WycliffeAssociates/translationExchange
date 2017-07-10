import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import {languageOptions} from "./common";

class LanguageButton extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {projects:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    componentDidMount() {
        axios.get('http://172.19.145.91:8000/api/languages/').then(results => {
            this.setState({
                projects: results.data
            })

        })
    }

        //I would do a web request here...
        //Just going to put fake data in state instead

    render () {
        return (
            <div>

                <Dropdown text='Select Language'
                          search
                          floating
                          labeled
                          button
                          className='icon'
                          icon='world'
                          options={languageOptions}
                />
            </div>
        );
    }

}

export default LanguageButton;