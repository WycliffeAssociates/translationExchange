/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
        console.log(project);
        return (

            <option >
                {project.book}
                {/*<Link to={'/projects/' + project.id}>{project.book} ({project.language})</Link>*/}
            </option>
        );
    }
}

/*
    Use PropTypes to define what props this component expects. If it's passed the wrong props,
    you'll get warnings while you're in development mode
 */
ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        book: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        translationType: PropTypes.string.isRequired,
        percentFinished: PropTypes.number.isRequired,
        contributors: PropTypes.arrayOf(PropTypes.string).isRequired,
        dateModified: PropTypes.string.isRequired
    })).isRequired
};

export default ProjectsList;