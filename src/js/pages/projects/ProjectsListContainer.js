/*
    Here's an example container component that would handle requesting from the API,
    parsing the data, and then passing it to a child presentation component.

    All the components for the projects screens are grouped together in a "projects"
    folder
*/

import React, { Component } from 'react';
import ProjectsList from "./ProjectsList";

class ProjectsListContainer extends Component {
    /*
        In the constructor, set the state to being empty so the component
        can render without errors before the API request finishes
    */
    constructor(props) {
        super(props);
        this.state = {projects: []};
    }

    /*
        In componentDidMount, do the API request for the data and then use
        setState to put the data in state
     */
    componentDidMount() {
        //I would do a web request here...
        this.setState({projects:
            [
                {id: 16, name: "foo"},
                {id: 17, name: "bar"}
            ]
        });
    }

    /*
        In render, just render a child presentation component, passing it
        the data as props
     */
    render () {
        return (
            <ProjectsList projects={this.state.projects}/>
        );
    }
}

export default ProjectsListContainer;