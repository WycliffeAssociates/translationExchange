import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
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
            languages: [],
            books: [],
            version: [],
            projects: []
        }
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
        language() {
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
    book(){
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

    version(){
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


    render() {
        if (this.state.projects) {

            var languageOptions = this.state.projects.map(function (user) {
                return {key: user.lang.name, text: user.lang.name, value: user.lang.name}
            });

            var bookOptions = this.state.projects.map(function (user) {
                return {key: user.book[0].name, text: user.book[0].name, value: user.book[0].name}
            });

            var versionOptions = this.state.projects.map(function (user) {
                return {key: user.version, text: user.version, value: user.version}
            });


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
                        options={versionOptions}
                    />
                </div>
            );
        }

    }
}

export default LanguageDropdown;