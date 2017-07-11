import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import {languageOptions} from "./common";
import config from 'config/config';

class LanguageDropdown extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {loaded: false, error: "", languages:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    componentDidMount() {
        this.setState({error: ""});

        axios.get(config.apiUrl + 'languages/'
        ).then(results => {
                this.setState({
                    loaded: true,
                    languages: results.data
                })
        }).catch(exception => {
            this.setState({error: exception});
        });
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
                <Dropdown text='Select Book'
                          search
                          floating
                          labeled
                          button
                          className='icon'
                          icon='comments outline'
                          options={languageOptions}
                />
                <Dropdown text='Select Version'
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

export default LanguageDropdown;