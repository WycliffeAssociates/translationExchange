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
            projects:[]
        }


        if (this.props.projects) {
            console.log('askjdfklasj');
            //put the languages from projects into state
            this.setState({
                loaded: true,
                languages: this.props.projects.map(function (user) {
                    return {key: user.lang.name, text: user.lang.name, value: user.lang.name} }),

                books: this.props.projects.map(function (user) {
                    return {key: user.book[0].name, text: user.book[0].name, value: user.book[0].name}  }),
            });
        }

            //
            //     books: this.props.projects.map(function (user) {
            //     return {key: user.book[0].name, text: user.book[0].name, value: user.book[0].name}
            // });

            // this.setState({ books: this.props.projects.map(function (user) {
            //     return {key: user.version, text: user.version, value: user.version}
            // });


        else {
            // do a request and put into state then. this .setstate
            this.setState({error: ""});
            axios.post('http://172.19.145.91:8000/api/all_project/', {
                    params: {}
                }
            ).then(results => {
                this.setState({
                    loaded: true,
                    projects: results.data,

                    languages: this.state.projects.map(function (user) {
                        return {key: user.lang.name, text: user.lang.name, value: user.lang.name} }),

                    books: this.state.projects.map(function (user) {
                        return {key: user.book[0].name, text: user.book[0].name, value: user.book[0].name}  }),
                });
            }).catch(exception => {
                this.setState({error: exception});
            });
        }
    }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */
    // language(e) {
    //     this.setState({error: ""});
    //     axios.get('http://172.19.145.91:8000/api/languages/'
    //     ).then(results => {
    //         this.setState({
    //             loaded: true,
    //             languages: results.data,
    //         });
    //     }).catch(exception => {
    //         this.setState({error: exception});
    //     });
    // }
    //
    // book(e) {
    //     this.setState({error: ""});
    //     axios.post('http://172.19.145.91:8000/api/books/'
    //     ).then(results => {
    //         this.setState({
    //             loaded: true,
    //             books: results.data
    //         });
    //     }).catch(exception => {
    //         this.setState({error: exception});
    //     });
    // }



    render() {
            console.log(this.state.languages);
            return (
                <div>
                    <Dropdown placeholder='Select Language'
                              selection
                              search
                              options={this.state.languages}
                              // onChange={this.language}
                    />
                    <Dropdown placeholder='Select Book'
                              selection
                              search
                              options={this.state.books}
                              //onChange={this.book}
                    />
                    {/*<Dropdown*/}
                        {/*placeholder='Select Version'*/}
                        {/*selection*/}
                        {/*search*/}
                        {/*options={versionOptions}*/}
                        {/*onChange={this.version}*/}
                    {/*/>*/}
                </div>
            );
        }
}

export default LanguageDropdown;