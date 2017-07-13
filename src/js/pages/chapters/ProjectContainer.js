import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            filesData : null,
            version: ''
        };
        this.getUploadedData = this.getUploadedData.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(event) {
        this.setState({
            filesData: event.target.value
        })
    }
    getUploadedData(event) {
        const context = this;
        event.preventDefault();
        axios.post({
            method: 'POST',
            url: 'http://localhost:3000/api/upload',
            data: JSON.stringify(context.state.filesData),
            success: function(data) {
                console.log('This is the uploaded data', data);
            }
        })
    }

    getChapterData() {
        axios.post(config.apiUrl + 'get_chapters/', {
            "language":"en-x-demo2",
            "version":"ulb",
            "book":"mrk"
        }).then((results) => {
            this.setState(
                {
                    chapters: results.data,
                    version: "ulb"
                }
            )
        })
    }

    navigateToChapter(chNum) {
        this.props.history.push(
            {
            pathname: this.props.location.pathname + '/ch' + chNum
            }
        )
    }

    componentDidMount () {

        this.getChapterData()




        /*
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
        */
    }

    render () {


        console.log('path', this.props.location.pathname)
        return (
            <div>

                {/*<input id="upload" ref="upload" type="file" accept=".pdf"*/}
                       {/*// onChange={(event)=> {*/}
                       {/*//     this.readFile(event)*/}
                       {/*// }}*/}
                       {/*onClick={(e)=> {*/}
                           {/*e.target.value = null*/}
                       {/*}}*/}

                {/*/>*/}


                <Container fluid>
                    {/*header will be dynamic later*/}
                    <Header as='h1'>Matthew (English)</Header>
                <Table selectable color="blue">
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
                        version={"ulb"}
                        navigateToChapter={this.navigateToChapter.bind(this)}
                    />


                </Table>
                    <br></br>
                    <form onSubmit={this.getUploadedData} method="post" encType="multipart/form-data">
                        <h4>Upload source audio</h4>
                        <Input type="file" name="fileUpload" className="form-control" onChange={this.handleFileChange}/>
                        <Button type="submit">Submit</Button>
                    </form>

                </Container>

            </div>
        );
    }
}

export default ProjectContainer;
