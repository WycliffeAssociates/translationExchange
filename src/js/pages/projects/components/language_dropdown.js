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
    populateFilters(projects) {
        if (projects.length > 0) {
            console.log('there are projects');
            //put the languages from projects into state
            this.setState({
                loaded: true,
                languages: projects.map(function (user) {
                    return {key: user.lang.name, text: user.lang.name, value: user.lang.name}
                }),

                books: projects.map(function (user) {
                    return {key: user.book[0].name, text: user.book[0].name, value: user.book[0].name}
                }),
            });
        }

        else {
            console.log("trying to reach server");
            this.setState({error: ""});
            axios.get('http://172.19.145.91:8000/api/languages/'
            ).then(results => {
                this.setState({
                    loaded: true,
                    languages: results.data.map(function (language) {
                        return {key: language.slug, text: language.name, value: language.slug}
                    })
                });
                console.log("thisstatelang")
                console.log(this.state.languages)
            }).catch(exception => {
                this.setState({error: exception});
            });


            this.setState({error: ""});
            axios.get('http://172.19.145.91:8000/api/books/'
            ).then(results => {
                this.setState({
                    loaded: true,
                    books: results.data.map(function (book) {
                        return {key: book.slug, text: book.name, value: book.slug}
                    })
                });
            }).catch(exception => {
                this.setState({error: exception});
            });

        }
    }

    componentDidMount(){
        this.populateFilters(this.props.projects)
    }

    componentWillReceiveProps(nextProps){
        this.populateFilters(nextProps.projects)
    }
    // }

    /*
     In componentDidMount, do the API request for the data and then use
     setState to put the data in state
     */




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