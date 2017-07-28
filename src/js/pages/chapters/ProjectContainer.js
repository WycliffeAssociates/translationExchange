import React, { Component } from 'react';
import {Button, Container, Header, Table, Input, TextArea } from "semantic-ui-react";
import ChapterList from "./components/ChapterList";
import axios from 'axios';
import config from 'config/config'
import QueryString from 'query-string';
import LoadingDisplay from "js/components/LoadingDisplay";
import LoadingGif from 'images/loading-tiny.gif'
import 'css/chapters.css'
import PublishButton from "./components/PublishButton";
import DownloadTR from "./components/DownloadTR"

class ProjectContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            chapters: [],
            book: {},
            language: {},
            project_id: -1,
            is_publish: false,
            filesData : null,
            loaded: false,
            error: "",
            publishError: "",
            anthology: {},
            version: {}
        };
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
            this.setState({publishError: exception});
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
            <div className="chapters">
                <Container fluid>

                    <LoadingDisplay loaded={this.state.loaded}
                                    error={this.state.error}
                                    retry={this.getChapterData.bind(this)}>

                        <Header as='h1' >{this.state.book.name} ({this.state.language.name})

                            <DownloadTR
                                chapters={this.state.chapters}
                                isPublish={this.state.is_publish}
                                onPublish={this.publishFiles.bind(this)}
                            />

                            <PublishButton
                            chapters={this.state.chapters}
                            isPublish={this.state.is_publish}
                            onPublish={this.publishFiles.bind(this)}
                            />

                        </Header>


                        <Table selectable fixed color="grey">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Chapter</Table.HeaderCell>
                                    <Table.HeaderCell>Percent Complete</Table.HeaderCell>
                                    <Table.HeaderCell>Checking Level</Table.HeaderCell>
                                    <Table.HeaderCell>Ready to Publish</Table.HeaderCell>
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

                </Container>

            </div>
        );
    }
}

export default ProjectContainer;
