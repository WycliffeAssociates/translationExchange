import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import {bookOptions, languageOptions} from "./common";
import config from 'config/config';

class LanguageDropdown extends Component {
    /*
     In the constructor, set the state to being empty so the component
     can render without errors before the API request finishes
     */
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: "",
            languages:[],
        books:[],
        version:[]};
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    componentDidMount() {
        this.setState({error: ""});

        axios.post('http://172.19.145.91:8000/api/all_project/', {
                params: {}
            }
        ).then(results => {
                this.setState({
                    loaded: true,
                    projects: results.data
                });
        }).catch(exception => {
            this.setState({error: exception});
        });
    }


        //I would do a web request here...
        //Just going to put fake data in state instead

    render () {
    if (this.state.projects) {

        const listItems = this.state.projects.map((project) =>
           <li> RIP</li>
        );


        // var languageOptions = this.state.projects.map(function (user) {
        //     return {key: user.lang.name.toString, text: user.lang.name.toString, value: user.lang.name.toString}
        // })
        // }

        console.log(listItems)
}
        return (
            <div>
                <Dropdown placeholder='Select Language'
                          selection
                          search
                          options={languageOptions}
                />
                <Dropdown placeholder='Select Book'
                          selection
                          search
                          options={bookOptions}
                />
                <Dropdown
                    placeholder='Select Version'
                    selection
                    search
                          options={languageOptions}
                />
            </div>
        );
    }

}

export default LanguageDropdown;