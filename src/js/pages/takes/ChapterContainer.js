

import React, {Component} from 'react';
import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import QueryString from "query-string";
import {Audio, RecordBtn} from "translation-audio-player";

import ChapterHeader from "./components/ChapterHeader.js";
import StitchTakes from "./components/StitchTakes"

let onClick;
// this is the page for one chapter

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            error: "",
            takes: [],
            book: "",
            language: "",
            mode: "",
            listenList: []
        };
    }

    componentDidMount () {
        this.requestData();
    }

    requestData () {
        var query = QueryString.parse(this.props.location.search);

        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_project/', query
        ).then((results) => {
            this.setState(
                {
                    loaded: true,
                    takes: results.data,
                    book: results.data[0].book.name,
                    language: results.data[0].language.name,
                    mode:results.data[0].mode
                }
            )
        }).catch((exception) => {
            this.setState({error: exception});
        });
    }

    /*
        Functions for making requests and updating state
     */

    patchTake(takeId, patch, success) {
        const promise = axios.patch(config.apiUrl + 'takes/' + takeId + '/', patch);
            promise
                .then((results) => {
                //find the take in state that this one corresponds to
                let updatedTakes = this.state.takes.slice();
                let takeToUpdate = updatedTakes.findIndex(take => take.take.id === takeId);
                updatedTakes[takeToUpdate].take = results.data;
                this.setState({
                    takes: updatedTakes
            })
            // if (success) { success(); } this is the old code
            .catch(err => {

            });
        });
    }

    deleteTake(takeId, success) {
        axios.delete(config.apiUrl + 'takes/' + takeId + '/'
        ).then((results) => {
            //make a new array of all the takes except the deleted one
            let updatedTakes = this.state.takes.filter(
                take => take.take.id !== takeId
            );
            this.setState({takes: updatedTakes});
            if (success) { success(); }
        });
    }

    updateChosenTakeForChunk(takeId) {
        let chosenTake = this.state.takes.find(take => take.take.id === takeId);
        //look through all the takes in this chapter...
        for (let i = 0; i < this.state.takes.length; i++) {
            let take = this.state.takes[i];

            //if there's one besides the chosen one that's in the same chunk
            //and is marked as done, then patch it to not be marked as done
            if (take.take.id !== chosenTake.take.id
                && take.take.startv === chosenTake.take.startv
                && take.take.is_export) {
                this.patchTake(take.take.id, {is_export: false});
            }
        }
    }

    addToListenList(props) {

        var newArr = this.state.listenList;
        var id = props.take.id;

        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].props.take.id === id) {
                newArr.splice(i, 1)
                this.setState({listenList: newArr})
                return ''
            }
        }

        newArr[newArr.length] = {props}
        this.setState({listenList: newArr})
    }

    /*
        Functions for grouping takes into chunks
     */
    findStartVerses(paramArr) { // creates array of each start verse
        var returnArr = [];
        paramArr.map((i) => {
        returnArr[returnArr.length] = i.take.startv
    })
        return (returnArr);
    }

    removeDuplicates(paramArr) { // removes duplicates from an array
        var returnArr = [];
        returnArr = paramArr.filter((item, pos) => {
            return paramArr.indexOf(item) === pos;
        })

        return (returnArr);
    }

    createArray(paramArr, segments) { // returns an array containing one array of takes for each segment
        var newArr = [];
        for (let i = 0; i < paramArr.length; i++) {
            var int = paramArr[i];
            var placeHolderArr = [];
            for (let j = 0; j < segments.length; j++) {
                if (int === segments[j].take.startv) {
                    placeHolderArr[placeHolderArr.length] = segments[j]
                }
            }
            newArr[i] = placeHolderArr
        }
        return (newArr);
    }

    getChunksFromTakes(takes) {
        let chunks = this.findStartVerses(this.state.takes); // find start verses
        chunks = chunks.sort(function (a, b) { // sort by start verse
            return a - b
        });
        chunks = this.removeDuplicates(chunks); // remove duplicates
        chunks = this.createArray(chunks, this.state.takes);
        return chunks;

    }

    /*
        Rendering functions
     */
    render () {
        var query = QueryString.parse(this.props.location.search);
        let chunks = this.getChunksFromTakes(this.state.takes);

        return (
            <div>
                <ChapterHeader loaded={this.state.loaded}
                               chapter={query.chapter}
                               book={this.state.book}
                               language={this.state.language}
                               takes={this.state.takes}
                               chunks={chunks}
                />

                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={this.requestData.bind(this)}>
                    {chunks.map(this.createChunkList.bind(this))}
                    <StitchTakes listenList={this.state.listenList}/>
                </LoadingDisplay>
            </div>
        );
    }

    createChunkList(takes) {

        return(
            <div>
                <ChunkList
                    segments={takes} // array of takes
                    mode={takes[0].take.mode}
                    number={takes[0].take.startv}
                    addToListenList={this.addToListenList.bind(this)}
                    patchTake={this.patchTake.bind(this)}
                    deleteTake={this.deleteTake.bind(this)}
                    updateChosenTakeForChunk={this.updateChosenTakeForChunk.bind(this)}
                />
            </div>
        );

    }
}

export default ChapterContainer;