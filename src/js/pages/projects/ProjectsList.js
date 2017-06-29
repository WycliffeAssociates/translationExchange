/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Col, Row} from "reactstrap";


class ProjectsList extends Component {
    /*
        Render data in props, passed to this component by its parent container component
     */
    render () {
        return (
            <tbody>
                {this.props.projects.map(this.createListItem)}
            </tbody>
        );
    }

    /*
        Here's an example of how to create a link using React Router
     */
    createListItem (project) {
        console.log(project);
        return (

        <tr>
            <th scope="row"> <Link to={'/projects/' + project.id}>{project.language}</Link> </th>
            <td><Link to={'/projects/' + project.id}>{project.book}</Link>  </td>
            <td><Link to={'/projects/' + project.id}>{project.percentFinished}</Link></td>
            <td><Link to={'/projects/' + project.id}>{project.translationType}</Link></td>


        </tr>


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