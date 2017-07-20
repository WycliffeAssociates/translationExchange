import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';
import LoadingDisplay from "js/components/LoadingDisplay";
import LoadingGif from 'images/loading-tiny.gif'

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            book: {},
            language: {},
            filesData : null,
            loaded: false,
            error: "",
            uploadSourceLoading: false,
            uploadSourceError: "",
            uploadSourceSuccess: ""
        };
        this.uploadSourceFile = this.uploadSourceFile.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(event) {
        var data = new FormData();
        data.append('file', event.target.files[0]);
        this.setState({
            filesData: data
        });
    }


    uploadSourceFile(event) {
        event.preventDefault();
        this.setState({uploadSourceLoading: true, uploadSourceError: ""});
        let uploadedLanguage = "";

        axios.post(config.apiUrl + 'source/source_filename', this.state.filesData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            uploadedLanguage = response.data.language.name;
            let updateProjectParams = {
                filter: QueryString.parse(this.props.location.search),
                fields: {
                    source_language: response.data.language.id
                }
            };
            return axios.post(config.apiUrl + 'update_project/', updateProjectParams);
        }).then((response) => {
            this.setState({uploadSourceLoading: false, uploadSourceSuccess: uploadedLanguage});
        }).catch((error) => {
            this.setState({uploadSourceLoading: false, uploadSourceError: error});
        });

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
                        <Header as='h1'>{this.state.book.name} ({this.state.language.name})

                        </Header>

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

                    {!this.state.uploadSourceLoading && this.state.uploadSourceSuccess
                        ? <div>Successfully uploaded {this.state.uploadSourceSuccess} and set it as source audio</div>
                        : <form onSubmit={this.uploadSourceFile} method="post" encType="multipart/form-data">
                            <h4>Upload source audio</h4>
                            <Input type="file" name="fileUpload" className="form-control" onChange={this.handleFileChange}/>
                            {this.state.uploadSourceLoading
                                ? <img src={LoadingGif} alt="Loading..." width="16" height="16"/>
                                : <Button type="submit">Submit</Button>
                            }
                            {this.state.uploadSourceError
                                ? "There was an error uploading the file: " + this.state.uploadSourceError
                                : ""
                            }
                        </form>
                    }

                </Container>

            </div>
        );
    }
}

export default ProjectContainer;
