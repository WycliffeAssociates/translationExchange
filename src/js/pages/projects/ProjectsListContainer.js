/*
    Here's an example container component that would handle requesting from the API,
    parsing the data, and then passing it to a child presentation component.

    All the components for the projects screens are grouped together in a "projects"
    folder
*/

import React, { Component } from 'react';
import ProjectsList from "./components/ProjectsList";
import 'css/projects.css'
import SearchButtons from "./components/all_buttons";
import {Container, Header, Table} from "semantic-ui-react";

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
                    percentFinished: 7,
                    contributors: ["Alison ","Erica"],
                    dateModified: "20 June 2017 4:16 pm"
                },
                {
                    id: 17,
                    book: "Mark",
                    language: "English",
                    translationType: "Unlocked Dynamic Bible",
                    percentFinished: 10,
                    contributors: ["Alison"],
                    dateModified: "20 March 2016 3:16 pm"
                },
                {
                    id: 18,
                    book: "Luke",
                    language: "English",
                    translationType: "Unlocked Dynamic Bible",
                    percentFinished: 25,
                    contributors: ["Juan"],
                    dateModified: "3 June 2015 9:33 pm"
                },
                {
                    id: 20,
                    book: "Genesis",
                    language: "Spanish",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 40,
                    contributors: ["Michael"],
                    dateModified: "20 June 2017 3:30 am"
                },
                {
                    id: 18,
                    book: "Exodus",
                    language: "English",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 87,
                    contributors: ["Dennis"],
                    dateModified: "26 March 2017 12:04 pm"
                },
                {
                    id: 18,
                    book: "Leviticus",
                    language: "Spanish",
                    translationType: "Unlocked Literal Bible",
                    percentFinished: 12,
                    contributors: ["Nathan"],
                    dateModified: "28 February  2017 8:35 am"
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
                <Container fluid>
                    <Header as='h1'>Available Projects</Header>

                <Table selectable fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Book</Table.HeaderCell>
                            <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                            <Table.HeaderCell>More</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>


                    <ProjectsList projects={this.state.projects}/>

                </Table>

                </Container>

            </div>
        );
    }
}

export default ProjectsListContainer;