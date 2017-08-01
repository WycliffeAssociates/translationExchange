import React, {Component} from 'react';
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import QueryString from "query-string";
import {Audio, RecordBtn} from "translation-audio-player";
import 'css/takes.css'
import ChapterHeader from "./components/ChapterHeader"
import Footer from './components/Footer'
import Chunk from "./components/Chunk"
import { Modal } from 'semantic-ui-react'
import Error from '../../pages/404Error'


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
            selectedSourceProjectQuery: -1,
            selectedSourceProject: {},
            listenList: [],
            query: '',
            currentPlaylist: [],
            active: false,
            audioLoop: false
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
                    mode: results.data.project.mode,
                }
            )
        });
    }

    updatingDeletedTake(takeId) {
        let updatedChunks = this.state.chunks.slice();
        let chunkToUpdate = updatedChunks.findIndex((chunk) => {
            return chunk.takes.find(take => take.take.id === takeId)
        });
        updatedChunks[chunkToUpdate].takes =
            updatedChunks[chunkToUpdate].takes.filter(take => take.take.id !== takeId);

        this.setState({
            chunks: updatedChunks
        });
    }

    updatingDeletedComment(type, commentId, takeId) {
        let updatedChunks = this.state.chunks.slice();
        if (type === "take") {
            let chunkToUpdate = updatedChunks.findIndex((chunk) => {
                return chunk.takes.find(take => take.take.id === takeId)
            });
            let takeToUpdate = updatedChunks[chunkToUpdate].takes
                .findIndex(take => take.take.id === takeId);

            updatedChunks[chunkToUpdate].takes[takeToUpdate].comments =
                updatedChunks[chunkToUpdate].takes[takeToUpdate].comments.filter(comment => comment.comment.id !== commentId);
            this.setState({
                chunks: updatedChunks
            });
        }

        else if (type === "chunk") {
            for (var i = 0; i < updatedChunks.length; i++) {
                if (updatedChunks[i].id === takeId) {
                    var chunkToUpdate = i;
                }
            }
            updatedChunks[chunkToUpdate].comments = updatedChunks[chunkToUpdate].comments.filter(comment => comment.comment.id !== commentId);
            this.setState({
                chunks: updatedChunks
            });

        }
        else if (type === "chapter") {
            let updatedChapter = Object.assign({}, this.state.chapter);

            updatedChapter.comments = updatedChapter.comments.filter(comment => comment.comment.id !== commentId);
            this.setState({
                chapter: updatedChapter
            });
        }
    }

    patchTake(takeId, patch, success) {
        axios.patch(config.apiUrl + 'takes/' + takeId + '/', patch
        ).then((results) => {
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
            }, () => {
                if (success) {
                    success(updatedChunks[chunkToUpdate].takes[takeToUpdate].take);
                }
            });
        }).catch((exception) => {
            if (exception.response) {
                if (exception.response.status === 404) {
                    alert("Sorry, that take doesn't exist!");
                    this.updatingDeletedTake(takeId);
                }
                else {
                    alert("Something went wrong. Please check your connection and try again. ")
                }
            }
            //timeout error doesn't produce response
            else {
                alert("Something went wrong. Please check your connection and try again. ")
            }
        });
    }

    /*
     Functions for making requests and updating state
     */

    deleteTake(takeId, success) {
        if (window.confirm('Delete this take?')) {
            axios.delete(config.apiUrl + 'takes/' + takeId + '/'

            ).then((results) => {
                this.updatingDeletedTake(takeId);
                if (success) {
                    success();
                }
            }).catch((exception) => {
                if (exception.response) {
                    if (exception.response.status === 404) {
                        this.updatingDeletedTake(takeId);
                    }

                    else {
                        alert("Something went wrong. Please check your connection and try again. " )
                    }
                }
                //timeout error doesn't produce response
                else {
                    alert("Something went wrong. Please check your connection and try again. ")
                }
            })
        }
    }


    deleteComment(type, commentId, takeId) {

        axios.delete(config.apiUrl + 'comments/' + commentId + '/')
            .then((results) => {
                this.updatingDeletedComment(type, commentId, takeId)
            })
            .catch((exception) => {
                if (exception.response) {
                    if (exception.response.status === 404) {
                        this.updatingDeletedComment(type, commentId, takeId)
                    }
                    else {
                        alert("Something went wrong. Please check your connection and try again.")
                    }
                }
                //timeout error doesn't produce response
                else {
                    alert("Something went wrong. Please check your connection and try again.")
                }
            })
    }


    onClickSave(blobx, type, id, success) {
        this.setState({
            active: true
        });
        axios.post(config.apiUrl + 'comments/', {
            "comment": blobx,
            "user": 3,
            "object": id,
            "type": type

        }).then((results) => {
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
                    chunks: updatedChunks,
                    active: false
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
                    chunks: updatedChunks,
                    active: false
                });
            }

            else {
                let updatedChapter = Object.assign({}, this.state.chapter);
                updatedChapter.comments.push(map);
                this.setState({
                    chapter: updatedChapter,
                    active: false
                });

            }
            success();

        }).catch((exception) => {

            alert("Something went wrong. Please check your connection and try again.");
            success();
            this.setState({
                active: false
            });
        })
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

    onMarkedAsPublish(success) {
        let parameters = {"is_publish": true}
        //make patch request to confirm that the chapter is ready to be published
        axios.patch(config.apiUrl + 'chapters/' + this.state.chapter.id + "/", parameters)
            .then((response) => {
                let updatedChapter = Object.assign({}, this.state.chapter);
                updatedChapter.is_publish = true;
                this.setState({chapter: updatedChapter});
                if (success) {
                    success()
                }
                ;
            }).catch((exception) => {
            console.log(exception);
        });
    }

    setSourceProject(projectQuery) {
        axios.post(config.apiUrl + 'get_project_takes/', {
            ...projectQuery,
            chapter: this.state.chapter.number
        }).then((results) => {
            this.setState(
                {
                    selectedSourceProjectQuery: projectQuery,
                    selectedSourceProject: results.data
                }
            );
        });
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
            chunk: chunk,
            count: props.count,
            mode: props.mode
        };

        newArr.push(newListenItem);
        this.setState({
            listenList: newArr
        })
    }

    getSourceAudioLocationForChunk(startv) {
        if (!this.state.selectedSourceProject) {
            return undefined;
        }
        let chunk = this.state.selectedSourceProject.chunks.find((chunk) => (chunk.startv === startv));
        let take = chunk.takes.find((take) => (take.take.is_publish));
        return take.take.location;
    }

    onSourceClicked(startv) {
        let sourceLoc = this.getSourceAudioLocationForChunk(startv);

        let playlist = [{
            "src": config.streamingUrl + sourceLoc,
            "name": this.state.mode + " " + startv + " (source)"
        }];
        this.setState({
            currentPlaylist: playlist
        });

    }

    playTake(takeLoc, takeNum, startv, author, date) {
        let playlist = [{
            "src": config.streamingUrl + takeLoc,
            "name": "take " + takeNum + ", " + this.state.mode + " " + startv + " (" + author + " on " + date + ")"
        }];
        this.setState({
            currentPlaylist: playlist,
            audioLoop: false
        });
    }

    playPlaylist(playlist) {

        this.setState({
            currentPlaylist: playlist,
            audioLoop: true
        })
    }

    /*
     Rendering functions
     */
    //TODO use key
    //TODO use this.props.location.key !== undefined
    render() {

        var query = QueryString.parse(this.props.location.search);
        console.dir(this.state)
        this.state.query = query;

        if(this.state.chunks.length > 0 && this.state.loaded === true) {
            return (
                <div>


                    <LoadingDisplay loaded={this.state.loaded}
                                    error={this.state.error}
                                    retry={this.requestData.bind(this)}>

                        <ChapterHeader book={this.state.book}
                                       chapter={this.state.chapter}
                                       language={this.state.language.name}
                                       chunks={this.state.chunks}
                                       mode={this.state.mode}
                                       selectedSourceProject={this.state.selectedSourceProjectQuery}
                                       onClickSave={this.onClickSave.bind(this)}
                                       deleteComment={this.deleteComment.bind(this)}
                                       setSourceProject={this.setSourceProject.bind(this)}
                                       onMarkedAsPublish={this.onMarkedAsPublish.bind(this)}
                                       active={this.state.active}
                                       projectId={this.state.project.id}

                        />

                        {this.state.chunks.map(this.createChunkList.bind(this))}

                        <div fluid className="StickyFooter">
                            <Footer mode={this.state.mode}
                                    listenList={this.state.listenList}
                                    currentPlaylist={this.state.currentPlaylist}
                                    playPlaylist={this.playPlaylist.bind(this)}
                                    playTake={this.playTake.bind(this)}
                                    audioLoop={this.state.audioLoop}
                            />
                        </div>
                    </LoadingDisplay>


                </div>
            );
        } else{
            return(<Error/>)
            // console.log("theres an error here")
        }
    }

    createChunkList(chunk) {
        /*
        segments is an array of takes for each chunk
         */
        return (
            <div>

                <Chunk
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
                    playTake={this.playTake.bind(this)}
                    onSourceClicked={this.onSourceClicked.bind(this)}
                    active={this.state.active}
                />


            </div>

        );

    }
}

export default ChapterContainer;