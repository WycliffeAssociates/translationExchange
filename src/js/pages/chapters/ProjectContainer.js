import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';
import LoadingDisplay from "js/components/LoadingDisplay";
import CheckingLevel from './components/CheckingLevel'
import LoadingGif from 'images/loading-tiny.gif'
import 'css/chapters.css'
import PublishButton from "../takes/components/PublishButton";
import FileDownload from 'react-file-download';

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
            uploadSourceSuccess: "",
            anthology: {},
            version: {}
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

    publishFiles() {
        let chapterID = this.state.project_id
        let parameters = {
            "is_publish": true
        }

        axios.patch(config.apiUrl + 'projects/' + chapterID +"/", parameters)
            .then((response) => {
                this.setState({is_publish: true})
            }).catch((exception) => {
            // modify for the error that occurs if the patch fails
            this.setState({error: exception});
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

    setCheckingLevel(level){

        let params = {
            filter: {
                language: this.state.language.slug,
                book: this.state.book.slug,
                chapter: this.state.chapters.name,
                anthology: this.state.anthology.name,
                version: this.state.version.name
            },
            fields: {
                checked_level: level
            }
        };

        axios.post(config.apiUrl + "update_project/", params);
    }

    getChapterData() {
        var query = QueryString.parse(this.props.location.search);

        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_chapters/', query
        ).then((results) => {
            // console.dir(results.data.slice(0, results.data.length - 2));
            // console.dir(results.data[results.data.length - 2]);
            // console.dir(results.data[results.data.length - 1]);
            this.setState(
                {
                    chapters: results.data.chapters,
                    book: results.data.book,
                    project_id: results.data.project_id,
                    is_publish: results.data.is_publish,
                    language: results.data.language,
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
                        <PublishButton
                            chapters={this.state.chapters}
                            onPublish={this.publishFiles.bind(this)}
                        />

                        </Header>

                        <Table selectable fixed color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Chapter</Table.HeaderCell>
                                    <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                                    <Table.HeaderCell>Checking Level</Table.HeaderCell>
                                    <Table.HeaderCell>Ready to Export</Table.HeaderCell>
                                    <Table.HeaderCell>Contributors</Table.HeaderCell>
                                    <Table.HeaderCell>Translation Type</Table.HeaderCell>
                                    <Table.HeaderCell>Date Modified</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <ChapterList
                                chapters={this.state.chapters}
                                version={QueryString.parse(this.props.location.search).version}
                                navigateToChapter={this.navigateToChapter.bind(this)}
                                setCheckingLevel={this.setCheckingLevel.bind(this)}
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
