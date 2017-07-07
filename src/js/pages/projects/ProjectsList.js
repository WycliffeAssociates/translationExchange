/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './projects.css'
import CircularProgressbar from 'react-circular-progressbar';

class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToProject: null
        };
    }
    /*
        Render data in props, passed to this component by its parent container component
     */
    render () {
        return (
            <tbody>
                {this.state.redirectToProject
                    ? <Redirect push to={{pathname: '/projects/' + this.state.redirectToProject}}/>
                    : this.props.projects.map(this.createListItem.bind(this))
                }
            </tbody>
        );
    }


    /*
        Here's an example of how to create a link using React Router
     */
    /*{project.percentFinished}*/
    createListItem (project) {
        return (
                 <tr onClick={() => this.setState({redirectToProject: project.id})}>


                    <th scope="row"> {project.language}</th>
                    <td>{project.book} </td>
                    <td>{project.translationType}</td>
                    <td>{project.contributors}</td>
                    <td>{project.dateModified}</td>
                     <td className="col-md-2">
                         <CircularProgressbar strokeWidth="20" percentage={project.percentFinished} />
                     </td>
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