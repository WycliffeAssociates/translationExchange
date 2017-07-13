import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import ProjectsList from "./components/ProjectsList";
import 'css/projects.css'
import axios from 'axios';
import config from 'config/config';
import LanguageDropdown from "./components/language_dropdown";

class ProjectsListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [], //projects gotten from the database
            currentProjectQuery: "" //what query was used to get those projects from the database
        };
    }

     componentDidMount () {
        //if query string isn't blank, then request projects here to initially populate projects list
        if (this.props.location.search) {
            this.requestProjects(this.props.location.search);
        }
     }

     requestProjects (queryString) {
        var query = QueryString.parse(queryString);
         axios.post(config.apiUrl + 'all_project/', query)
         .then((results) => {
             this.setState({
                 projects: results.data,
                 currentProjectQuery: queryString
             });
         }).catch((exception) => {
             console.log("ERROR");
             console.dir(exception);
         });
     }

    //if the project query string has changed, request projects
    componentWillReceiveProps (nextProps) {
        if (this.state.currentProjectQuery !== nextProps.location.search) {
            this.requestProjects(nextProps.location.search);
        }
    }

    setQuery (newQueryElement) {
        //merge together the current query with the new query element
        var currentQuery = QueryString.parse(this.state.currentProjectQuery);
        Object.assign(currentQuery, newQueryElement);

        //now turn the query into a query string and navigate to it
        var queryString = QueryString.stringify(currentQuery);
        this.props.history.push({
            pathname: this.props.location.pathname,
            search: "?" + queryString
        });
    }

    render () {
        return (
            <div>
                    <LanguageDropdown projects={this.state.projects}
                                      setQuery={this.setQuery.bind(this)}
                                      queryString={this.props.location.search}/>
                    <ProjectsList projects={this.state.projects}/>
            </div>
        );
    }
}

export default ProjectsListContainer;