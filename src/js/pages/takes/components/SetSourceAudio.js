import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import config from 'config/config';

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
                    projects.push({key: project.id, value: project.id, text: project.language.name + " (" + project.version + ")"});
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