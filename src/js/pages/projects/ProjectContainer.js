import React, { Component } from 'react';
import ChapterList from "../chapter/ChapterList";
import {Table} from "semantic-ui-react";


class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: []
        };
    }

    componentDidMount () {



        //request project and chapter info here...
        this.setState(
            {
                chapters: [
                    {
                        number: 1,
                        percentFinished: 100.0,
                        checkingLevel: 2,
                        contributors: ["Alison"],
                        translationType: "ULB",
                        timestamp: "20 June 2017 4:16 pm"
                    },
                    {
                        number: 16,
                        percentFinished: 16.0,
                        checkingLevel: 0,
                        contributors: ["Bob the Translator"],
                        translationType: "ULB",
                        timestamp: "20 June 2017 6:07 am"
                    }
                ]
            }
        );
    }

    render () {
        return (
            <div>
                <h1>Matthew (English)</h1>

                <Table celled selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Chapter</Table.HeaderCell>
                            <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                            <Table.HeaderCell>Checking Level</Table.HeaderCell>
                            <Table.HeaderCell>Contributors</Table.HeaderCell>
                            <Table.HeaderCell>Translation Type</Table.HeaderCell>
                            <Table.HeaderCell>Date Modified</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <ChapterList
                        chapters={this.state.chapters}
                        path={this.props.location.pathname}
                    />

                </Table>


            </div>
        );
    }
}

export default ProjectContainer;
