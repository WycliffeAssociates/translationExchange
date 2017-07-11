import React, { Component } from 'react';
import ChapterList from "../chapter/ChapterList";
import Jumbotron from "react-bootstrap/es/Jumbotron";
import Table from "react-bootstrap/es/Table";

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
                        timestamp: "20 June 2017 4:16 pm"
                    },
                    {
                        number: 16,
                        percentFinished: 16.0,
                        checkingLevel: 0,
                        contributors: ["Bob the Translator"],
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
                <Jumbotron className="jumbotroncustom">
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Chapter</th>
                            <th>Percent Complete</th>
                            <th>Checking Level</th>
                            <th>Contributors</th>
                            <th>Translation Type</th>
                            <th>Date Modified</th>
                        </tr>
                        </thead>

                        <ChapterList
                            chapters={this.state.chapters}
                            path={this.props.location.pathname}
                        />
                    </Table>
                </Jumbotron>



            </div>
        );
    }
}

export default ProjectContainer;
