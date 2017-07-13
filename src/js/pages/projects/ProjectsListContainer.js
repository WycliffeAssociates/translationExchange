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
        console.log(query);

         axios.post(config.apiUrl + 'all_project/', query)
         .then((results) => {
             console.log(results);
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


    render () {
        console.log(this.state.projects);
        return (
            <div>
                    <LanguageDropdown projects={this.state.projects}
                                      queryString={this.state.currentProjectQuery}/>
                    <ProjectsList projects={this.state.projects}/>
                <Link to={{ pathname: '/projects', search: "?language=en-x-demo2" }} >English</Link>
                <Link to={{ pathname: '/projects', search: "?language=aad" }} >Amal</Link>

            </div>
        );
    }
}

export default ProjectsListContainer;