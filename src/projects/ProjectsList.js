/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProjectsList extends Component {
    /*
        Render data in props, passed to this component by its parent container component
     */
    render () {
        return (
            <ul>
                {this.props.projects.map(this.createListItem)}
            </ul>
        );
    }

    /*
        Here's an example of how to create a link using React Router
     */
    createListItem (project) {
        return (
            <li key={project.id}>
                <Link to={'/projects/' + project.id}>{project.name}</Link>
            </li>
        );
    }
}

export default ProjectsList;