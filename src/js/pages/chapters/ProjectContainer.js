import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';
import LoadingDisplay from "js/components/LoadingDisplay";
import CheckingLevel from './components/CheckingLevel'

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            book: {},
            language: {},
            filesData : null,
            loaded: false,
            error: ""
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

        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_chapters/', query
        ).then((results) => {
            console.dir(results.data.slice(0, results.data.length - 2));
            console.dir(results.data[results.data.length - 2]);
            console.dir(results.data[results.data.length - 1]);
            this.setState(
                {
                    chapters: results.data.slice(0, results.data.length - 2),
                    book: results.data[results.data.length - 2].book[0],
                    language: results.data[results.data.length - 1].lang[0],
                    loaded: true
                }
            )
        }).catch((exception) => {
           this.setState({error: exception});
        });
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
                <Container fluid>

                    <LoadingDisplay loaded={this.state.loaded}
                                    error={this.state.error}
                                    retry={this.getChapterData.bind(this)}>
                        <Header as='h1'>{this.state.book.name} ({this.state.language.name})</Header>
                        <Table selectable fixed color="blue">
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
                    </LoadingDisplay>

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
