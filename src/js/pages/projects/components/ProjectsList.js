/*
    Here's an example presentation component that just handles outputting data. It
    doesn't care where you got the data from - it just displays it.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {Container, Header, Table} from "semantic-ui-react";
import CircularProgressbar from 'react-circular-progressbar'
import '../../../../css/projects.css'

import {ReadMore} from 'react-read-more';

class ProjectsList extends Component {
    /*
        Render data in props, passed to this component by its parent container component
     */
    render () {
        return (
            <Container fluid>
                <Table selectable fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Book</Table.HeaderCell>
                            <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                            <Table.HeaderCell>More</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>


                    <Table.Body>
                        {this.props.projects.map(this.createListItem.bind(this))}
                    </Table.Body>

                </Table>

            </Container>

        );
    }


    /*
        Here's an example of how to create a link using React Router
     */
    /*{project.percentFinished}*/
    createListItem (project) {
        var navigateToProject = (function () {
            this.props.navigateToProject(project.lang.slug, project.book[0].slug, project.version);
        }).bind(this);

        return (
            <Table.Row >
                <Table.Cell onClick={navigateToProject}>{project.lang.name}</Table.Cell>
                <Table.Cell onClick={navigateToProject}>{project.book[0].name}</Table.Cell>
                <Table.Cell onClick={navigateToProject}><CircularProgressbar strokeWidth="20" percentage={project.completed} /></Table.Cell>
                <Table.Cell><ReadMore lines={1} onShowMore={this.props.onChange} text="more">
                                 <b>Date Modified</b>: {project.timestamp} <br/>
                                 <b>Translation Type</b>: {project.version} <br/>
                                 <b>Contributors</b>: {project.contributors} <br/>
                             </ReadMore></Table.Cell>

            </Table.Row>

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