import React, {Component} from 'react';
import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import QueryString from "query-string";
import {Audio, RecordBtn} from "translation-audio-player";
import 'css/takes.css'
import MarkAsDone from "./components/MarkAsDone"

import {Container, Segment, Label, Sidebar, Grid} from 'semantic-ui-react'
import Footer from './components/Footer'

let onClick;

class ChapterContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: "",
            chunks: [],
            project: {},
            book: {},
            chapter: {},
            language: {},
            mode: "",
            listenList: [],
            query: ''
        };
    }

    componentDidMount() {
        this.requestData();
    }

    requestData() {
        var query = QueryString.parse(this.props.location.search);
        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_project_takes/', query
        ).then((results) => {
            this.setState(
                {
                    loaded: true,
                    chunks: results.data.chunks,
                    project: results.data.project,
                    book: results.data.book,
                    chapter: results.data.chapter,
                    language: results.data.language,
                    mode: results.data.project.mode
                }
            )
        });
    }

    /*
     Functions for making requests and updating state
     */

    patchTake(takeId, patch, success) {
        axios.patch(config.apiUrl + 'takes/' + takeId + '/', patch
        ).then((results) => {
            console.dir(results.data);
            //find the take in state that this one corresponds to
            let updatedChunks = this.state.chunks.slice();
            let chunkToUpdate = updatedChunks.findIndex((chunk) => {
                return chunk.takes.find(take => take.take.id === takeId)
            });
            let takeToUpdate = updatedChunks[chunkToUpdate].takes
                .findIndex(take => take.take.id === takeId);
            updatedChunks[chunkToUpdate].takes[takeToUpdate].take = results.data;
            this.setState({
                chunks: updatedChunks
            });

            if (success) {
                success();
            }
        });
    }

    deleteTake(takeId, success) {
        axios.delete(config.apiUrl + 'takes/' + takeId + '/'
        ).then((results) => {
            //find the chunk with the take just deleted
            let updatedChunks = this.state.chunks.slice();
            let chunkToUpdate = updatedChunks.findIndex((chunk) => {
                return chunk.takes.find(take => take.take.id === takeId)
            });

            //give it a new array of all its takes except the one to delete
            updatedChunks[chunkToUpdate].takes =
                updatedChunks[chunkToUpdate].takes.filter(take => take.take.id !== takeId);

            //if the chunk now has no takes, remove it from state
            if (!(updatedChunks[chunkToUpdate].takes.length > 0)) {
                updatedChunks.splice(chunkToUpdate, 1);
            }

            this.setState({
                chunks: updatedChunks
            });
            if (success) {
                success();
            }
        });
    }

    deleteComment(type, commentid, takeid) {
        axios.delete('http://172.19.145.91/api/comments/' + commentid + '/'
        ).then((results) => {
            let updatedChunks = this.state.chunks.slice();
            if (type === "take") {
                let chunkToUpdate = updatedChunks.findIndex((chunk) => {
                    return chunk.takes.find(take => take.take.id === takeid)
                });
                let takeToUpdate = updatedChunks[chunkToUpdate].takes
                    .findIndex(take => take.take.id === takeid);

                updatedChunks[chunkToUpdate].takes[takeToUpdate].comments =
                    updatedChunks[chunkToUpdate].takes[takeToUpdate].comments.filter(comment => comment.comment.id !== commentid);
                this.setState({
                    chunks: updatedChunks
                });
            }

            else if (type === "chunk") {
                for (var i = 0; i < updatedChunks.length; i++) {
                    if (updatedChunks[i].id === takeid) {
                        var chunkToUpdate = i;
                    }
                }
                updatedChunks[chunkToUpdate].comments = updatedChunks[chunkToUpdate].comments.filter(comment => comment.comment.id !== commentid);
                this.setState({
                    chunks: updatedChunks
                });

            }
            else if (type === "chapter") {
                let updatedChapter = Object.assign({}, this.state.chapter);

                updatedChapter.comments = updatedChapter.comments.filter(comment => comment.comment.id !== commentid);
                this.setState({
                    chapter: updatedChapter
                });
            }

        })
    }

    onClickSave(blobx, type, id) {
        axios.post(config.apiUrl + 'comments/', {
            "comment": blobx,
            "user": 3,
            "object": id,
            "type": type

        }).then((results) => {
            console.log('data', results.data);
            var map = {"comment": results.data};
            let updatedChunks = this.state.chunks.slice();

            if (type === "take") {
                let chunkToUpdate = updatedChunks.findIndex((chunk) => {
                    return chunk.takes.find(take => take.take.id === id)
                });
                let takeToUpdate = updatedChunks[chunkToUpdate].takes
                    .findIndex(take => take.take.id === id);
                updatedChunks[chunkToUpdate].takes[takeToUpdate].comments.push(map);
                this.setState({
                    chunks: updatedChunks
                });
            }
            else if (type === "chunk") {

                for (var i = 0; i < updatedChunks.length; i++) {
                    if (updatedChunks[i].id === id) {
                        var chunkToUpdate = i;
                    }
                }
                updatedChunks[chunkToUpdate].comments.push(map);
                this.setState({
                    chunks: updatedChunks
                });
            }

            else {
                let updatedChapter = Object.assign({}, this.state.chapter);
                updatedChapter.comments.push(map);
                this.setState({
                    chapter: updatedChapter
                });

            }

        });
    }

    updateChosenTakeForChunk(takeId) {
        let updatedChunk = this.state.chunks.find((chunk) => {
            return chunk.takes.find(take => take.take.id === takeId)
        });

        for (let i = 0; i < updatedChunk.takes.length; i++) {
            let currentTake = updatedChunk.takes[i];
            //if there's one besides the chosen one in the same chunk
            //that is marked is_publish, then patch it to not be marked is_publish
            if (currentTake.take.is_publish && currentTake.take.id !== takeId) {
                this.patchTake(currentTake.take.id, {is_publish: false});
            }
        }
    }

    addToListenList(props) {

        var newArr = this.state.listenList;
        var id = props.take.id;

        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].props.take.id === id) {
                newArr.splice(i, 1)
                this.setState({listenList: newArr});
                return ''
            }
        }

        //find the chunk that this take was from, and add chunk info
        let chunk = this.state.chunks.find((chunk) => {
            return chunk.takes.find(take => take.take.id === id)
        });
        let newListenItem = {
            props: props,
            chunk: chunk
        };

        newArr.push(newListenItem);
        this.setState({listenList: newArr})
    }

    /*
     Rendering functions
     */
    render() {
        var query = QueryString.parse(this.props.location.search);

        this.state.query = query;

        return (
            <div>

                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={this.requestData.bind(this)}>

                    <MarkAsDone chapter={this.state.chapter}
                                chunks={this.state.chunks}
                                mode={this.state.mode}/>
                    <h1>Chapter {query.chapter} </h1>

                    {this.state.chunks.map(this.createChunkList.bind(this))}
                </LoadingDisplay>


            </div>
        );
    }

    createChunkList(chunk) {
        return (
            <div>
                <ChunkList
                    comments={chunk.comments}
                    segments={chunk.takes} // array of takes
                    mode={this.state.mode}
                    number={chunk.startv}
                    addToListenList={this.addToListenList.bind(this)}
                    patchTake={this.patchTake.bind(this)}
                    deleteTake={this.deleteTake.bind(this)}
                    updateChosenTakeForChunk={this.updateChosenTakeForChunk.bind(this)}
                    onClickSave={this.onClickSave.bind(this)}
                    id={chunk.id}
                    deleteComment={this.deleteComment.bind(this)}
                    loaded={this.state.loaded}
                    chapter={this.state.query.chapter}
                    book={this.state.book.name}
                    language={this.state.language.name}
                    chunks={this.state.chunks}
                    listenList={this.state.listenList}

                />
            </div>
        );

    }
}

export default ChapterContainer;