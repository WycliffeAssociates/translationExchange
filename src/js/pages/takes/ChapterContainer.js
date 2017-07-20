import React, {Component} from 'react';
import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import QueryString from "query-string";
import { Button } from 'semantic-ui-react';
import CommentContainer from "./components/comments/CommentContainer";
import {Audio, RecordBtn} from "translation-audio-player";
import ChapterHeader from "./components/ChapterHeader.js";
import StitchTakes from "./components/StitchTakes";

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loaded: false,
            open: false,
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
        Functions for updating state
     */

    //if a child component does requests to change a take in the database, they have to
    //call this function to update the take in state.
    updateTakeInState (updatedTake) {
        var updatedSegments = this.state.takes.slice();
        var takeToUpdate = updatedSegments.findIndex(take => take.take.id === updatedTake.take.id);
        updatedSegments[takeToUpdate] = updatedTake;
        this.setState({
            segments: updatedSegments
        });
        console.log("SET STATE");
        console.dir(updatedSegments);
    }

    addToListenList(props) {

        var newArr = this.state.listenList;
        var id = props.take.id;

        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].props.take.id === id) {
                newArr = newArr.splice(i-1, 1)

                this.setState(
                    {
                        listenList: newArr
                    }
                )

                return ''
            }
        }

        newArr[newArr.length] = {
            props
        }

        this.setState(
            {
                listenList: newArr
            }
        )

    }

    //if a child component deletes a take, they have to call this function to update our representation
    //of all the takes in state
    deleteTakeFromState(takeIdToDelete){
        var updatedSegments = this.state.takes.slice();
        var deleteIndex = updatedSegments.findIndex(take => take.take.id === takeIdToDelete);
        updatedSegments.splice(deleteIndex, 1);
        this.setState({takes: updatedSegments});
    }

    onClick = () => {// used when you click the microphone button in the player
        this.setState({
            open: true
        });
    }

    /*
        Functions for grouping takes into chunks
     */
    findStartVerses(paramArr) { // creates array of each start verse
        var returnArr = [];
        for (let i = 0; i < paramArr.length; i++) {
            returnArr[returnArr.length] = paramArr[i].take.startv
        }
        return (returnArr);
    }

    removeDuplicates(paramArr) { // removes duplicates from an array
        var returnArr = [];
        returnArr = paramArr.filter(function(item, pos) {
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
        chunks = chunks.sort(function(a, b) { // sort by start verse
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
                <Button
                    onClick={this.onClick}
                    color="pink"
                    floated='right'
                    ref={audioComponent => { this.audioComponent = audioComponent; }}
                    icon="microphone"/>

                <CommentContainer
                    open={this.state.open}
                    ref={instance => (this.commentContainer = instance)}/>

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
                    updateTakeInState={this.updateTakeInState.bind(this)}
                    addToListenList={this.addToListenList.bind(this)}
                    deleteTakeFromState={this.deleteTakeFromState.bind(this)}
                />
            </div>
        );

    }
}

export default ChapterContainer;