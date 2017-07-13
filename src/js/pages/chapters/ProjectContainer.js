import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            filesData : null
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
        var query = QueryString.parse(this.props.location.search);

        axios.post(config.apiUrl + 'get_chapters/', query
        ).then((results) => {
            this.setState(
                {
                    chapters: results.data
                }
            )
        })
    }

    navigateToChapter(chNum) {
        var query = QueryString.parse(this.props.location.search);
        query.chapter = chNum;
        this.props.history.push(
            {
                pathname: "/takes",
                search: QueryString.stringify(query)
            }
        )
    }

    componentDidMount () {
        this.getChapterData()
    }

    render () {


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
                        version={QueryString.parse(this.props.location.search).version}
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
