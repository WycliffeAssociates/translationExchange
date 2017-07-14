import React, { Component } from 'react';
import {Button, Container, Header, Table} from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            filesData : null,
            version: '',
        };
        this.getUploadedData = this.getUploadedData.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(event) {
        var data = new FormData();
        data.append('file', event.target.files[0], event.target.files[0].name);
        this.setState({
            filesData: data
        });
    }

    getUploadedData(event) {
        event.preventDefault();
        axios.post('http://172.19.145.91:8000/api/source/source_filename', this.state.filesData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(function(response){
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
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

    }

    render () {


        console.log('path', this.props.location.pathname)
        return (
            <div>

                <form onSubmit={this.getUploadedData} method="post" encType="multipart/form-data">
                    Upload source audio

                    <input type="file" name="fileUpload" className="form-control" onChange={this.handleFileChange}/>
                    <input type="submit" />

                </form>
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
                </Container>

            </div>
        );
    }
}

export default ProjectContainer;
