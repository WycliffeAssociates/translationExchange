/*
    Here's an example container component that would handle requesting from the API,
    parsing the data, and then passing it to a child presentation component.

    All the components for the projects screens are grouped together in a "projects"
    folder
*/

import React, { Component } from 'react';
import ProjectsList from "./ProjectsList";
import {Button, Col, FormGroup, Input, Jumbotron, Label, Table} from "reactstrap";
import SearchButtons from "../../search buttons/all_buttons";

class ProjectsListContainer extends Component {
    /*
        In the constructor, set the state to being empty so the component
        can render without errors before the API request finishes
    */
    constructor(props) {
        super(props);
        this.state = {projects:[]};
    }

    /*
        In componentDidMount, do the API request for the data and then use
        setState to put the data in state
     */
    componentDidMount() {
        //I would do a web request here...
        //Just going to put fake data in state instead
        this.setState({projects:
            [
                {
                    id: 16,
                    book: "Matthew",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                },
                {
                    id: 17,
                    book: "Mark",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                },
                {
                    id: 18,
                    book: "Luke",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 5.6,
                    contributors: ["Alison"],
                    dateModified: "20 June 2017 4:16 pm"
                }
            ]
        });
    }

    /*
        In render, just render a child presentation component, passing it
        the data as props
     */
    render () {
        return (
            <div>

                <div className="App-buttons">
                    <SearchButtons/>
                </div>

                <h1>Available Projects</h1>

                <Table striped>
                    <thead>
                    <tr>
                        <th>Language</th>
                        <th>Book</th>
                        <th>Percent Complete</th>
                        <th>Translation Type</th>
                    </tr>
                    </thead>

                    <ProjectsList projects={this.state.projects}/>

                </Table>




            </div>
        );
    }
}

export default ProjectsListContainer;