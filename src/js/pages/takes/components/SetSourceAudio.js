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
                let projects = [{key: "", value: "", text: ""}];
                results.data.map((project) => {
                    projects.push({key: project.id, value: project.id, text: project.language.name + " (" + project.version + ")"});
                });
                this.setState({
                    loaded: true,
                    projects: projects
                });
            }).catch((exception) => {
            this.setState({error: exception});
        });
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
                      loading={!this.state.loaded}
                      options={this.state.projects}
            />
        );

        // return (
        //     <LoadingDisplay loaded={this.state.loaded} retry={this.getProjects.bind(this)} error={this.state.error}>
        //         <Card>
        //             <Card.Content>
        //                 <Card.Header>
        //                     Select Source Audio
        //                 </Card.Header>
        //             </Card.Content>
        //             <Card.Content>
        //                 <Dropdown placeholder='Choose a project' fluid search selection options={this.state.projects} />
        //                 <Button>Set as source</Button>
        //             </Card.Content>
        //         </Card>
        //     </LoadingDisplay>
        // )
    }
}