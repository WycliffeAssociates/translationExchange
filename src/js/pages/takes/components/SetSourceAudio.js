import React, { Component } from 'react'
import { Form, Label, Dropdown, Image } from 'semantic-ui-react'
import axios from 'axios';
import config from 'config/config';
import SourceEar from 'images/source-ear.png'

export default class SetSourceAudio extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loaded: false,
          error: "",
          projects: []
        };
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects() {
        this.setState({error: ""});
        axios.post(config.apiUrl + 'all_projects/', {is_publish: true, book: "mrk"})
            .then((results) => {
                let projects = [];
                results.data.map((project) => {
                    let projectQuery = {
                        language: project.language.slug,
                        book: project.book.slug,
                        version: project.version
                    };
                    projects.push({key: project.id, value: projectQuery, text: project.language.name + " (" + project.version + ")"});
                });
                this.setState({
                    loaded: true,
                    projects: projects
                }, () => { //by default, initially set source to first available project
                    this.setSource(projects[0].value)
                });
            }).catch((exception) => {
            this.setState({error: exception});
        });
    }

    setSource(projectId) {
        this.props.setSourceProject(projectId);
    }

    render() {

        return (
            <Dropdown
                      search
                      selection
                      floated="right"
                      labeled
                      className="icon"
                      icon="assistive listening systems"
                      value={this.props.selectedSourceProject}
                      loading={!this.state.loaded}
                      options={this.state.projects}
                      onChange={(event, dropdown) => {this.setSource(dropdown.value)}}
            />
        );

    }
}