import React, { Component } from 'react';
import {Button, Container, Header, Icon, Input, Label, Table} from "semantic-ui-react";
import ChapterList from "./components/ChapterList";


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
                UPLOAD SOURCE AUDIO
                <input id="upload" ref="upload" type="file" accept=".pdf"
                       // onChange={(event)=> {
                       //     this.readFile(event)
                       // }}
                       onClick={(e)=> {
                           e.target.value = null
                       }}

                />
                <Button>
                    Upload
                </Button>

                <Container fluid>
                    {/*header will be dynamic later*/}
                    <Header as='h1'>Matthew (English)</Header>



                <Table selectable>
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
                </Container>

            </div>
        );
    }
}

export default ProjectContainer;
