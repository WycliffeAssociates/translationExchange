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
            versions: [],
            projects: []
        }
    }

    getFiltersFromProjects(projects) {
        //put the languages from projects into state
        this.setState({
            loaded: true,
            languages: projects.map(function (project) {
                return {key: project.lang.slug, text: project.lang.name, value: project.lang.slug}
            }),

            books: projects.map(function (project) {
                return {key: project.book[0].slug, text: project.book[0].name, value: project.book[0].slug}
            }),

            versions: projects.map(function (project) {
                return {key: project.version, text: project.version, value: project.version}
            })
        });
    }

    requestAllFilters() {
        var self = this;
        self.setState({error: ""});

        axios.all([
            axios.get(config.apiUrl + 'languages/'),
            axios.get(config.apiUrl + 'books/'),
            axios.post(config.apiUrl + 'get_versions/', {}),
        ]).then(axios.spread(function (languagesResponse, booksResponse, versionsResponse) {
            self.setState({
                loaded: true,
                languages: languagesResponse.data.map(function (language) {
                    return {key: language.slug, text: language.name, value: language.slug}
                }),
                books: booksResponse.data.map(function (book) {
                    return {key: book.slug, text: book.name, value: book.slug}
                }),
                versions: versionsResponse.data.map(function(version) {
                    return {key: version, text: version, value: version}
                })
            });
        })).catch(exception => {
            self.setState({error: exception});
        });
    }

    //called when page first loads
    componentDidMount(){
        if (this.props.queryString) {
            this.getFiltersFromProjects(this.props.projects);
        } else {
            this.requestAllFilters();
        }
    }

    //called when just the query string changes and new projects are loaded
    componentWillReceiveProps(nextProps){
        this.setState({loaded: false});
        this.getFiltersFromProjects(nextProps.projects);
    }

    setLanguage(event, dropdown) {
        this.props.setQuery({language: dropdown.value});
    }

    setBook(event, dropdown) {
        this.props.setQuery({book: dropdown.value});
    }

    setVersion(event, dropdown) {
        this.props.setQuery({version: dropdown.value});
    }

    render() {
        return (
            <div>
                <Dropdown placeholder='Select Language'
                          selection
                          search
                          loading={!this.state.loaded}
                          options={this.state.languages}
                          onChange={this.setLanguage.bind(this)}
                />
                <Dropdown placeholder='Select Book'
                          selection
                          search
                          loading={!this.state.loaded}
                          options={this.state.books}
                          onChange={this.setBook.bind(this)}
                />
                <Dropdown
                    placeholder='Select Version'
                    selection
                    search
                    options={this.state.versions}
                    onChange={this.setVersion.bind(this)}
                />
            </div>
        );
    }
}

export default LanguageDropdown;