import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import ProjectsList from "./components/ProjectsList";

import '../../../css/projects.css'
import {Container, Header, Table} from "semantic-ui-react";
import axios from 'axios';
import config from 'config/config';
import FilterContainer from "./FilterContainer";
import LoadingDisplay from "js/components/LoadingDisplay";



class ProjectsListContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            error: "",
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
         this.setState({loaded: false, error: ""});

         axios.post(config.apiUrl + 'all_projects/', query)
         .then((results) => {
             this.setState({
                 loaded: true,
                 projects: results.data,
                 currentProjectQuery: queryString
             });
         }).catch((exception) => {
             this.setState({error: exception});
         });
     }

    //if the project query string has changed, request projects
    componentWillReceiveProps (nextProps) {
        if (!nextProps.location.search) {
            this.setState({currentProjectQuery: "", projects: []});
        } else if (this.state.currentProjectQuery !== nextProps.location.search) {
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

    clearQuery () {
        //empty the current query and projects, and after the state has been set, navigate
        //to a URL without the query
        this.setState({currentProjectQuery: "", projects: []},
            function () {
                this.props.history.push({
                    pathname: this.props.location.pathname
                });
        });
    }

    navigateToProject (language, book, version) {
        //make the query for the right project, using our current query as a base
        var projectQuery = QueryString.parse(this.state.currentProjectQuery);
        Object.assign(projectQuery, {
            language: language,
            book: book,
            version: version
        });

        var queryString = QueryString.stringify(projectQuery);
        this.props.history.push(
            {
                pathname: '/chapters',
                search: "?" + queryString
            }
        )
    }

    render () {
        var retryRequestProjects = function () {this.requestProjects(this.props.location.search)};

        return (
            <div>
                <Header as='h1'>Choose a project</Header>

                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={retryRequestProjects.bind(this)}>
                    <FilterContainer projects={this.state.projects}
                                     setQuery={this.setQuery.bind(this)}
                                     queryString={this.props.location.search}
                                     clearQuery={this.clearQuery.bind(this)}/>
                    {this.state.projects.length > 0
                        ? <ProjectsList projects={this.state.projects}
                                        navigateToProject={this.navigateToProject.bind(this)}/>
                        : ""
                    }
                </LoadingDisplay>
            </div>
        );
    }
}

export default ProjectsListContainer;