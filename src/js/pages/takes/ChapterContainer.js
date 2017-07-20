import React, {Component} from 'react';

import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import { Accordion, Icon, Grid, Button } from 'semantic-ui-react'
import AudioComponent from './components/AudioComponent'
import QueryString from "query-string";
import CommentContainer from "./components/comments/CommentContainer";
import {Audio, RecordBtn} from "translation-audio-player";
import * as ReactDOM from "react-dom";


// this is the page for one chapter

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {loaded: false,
            open: false,
            error: "", segments: [], mode: "", source: "", listenList: [], chapters: [], isToggleOn: true, exportSource: true

        };
    }

    componentDidMount () {
        this.requestData();
    }


    createListenPlaylist() {
        var playlist = [];

        for(let i = 0; i < this.state.listenList.length; i++) {
            playlist[playlist.length] = {
                "src": config.streamingUrl + this.state.listenList[i].props.take.location,
                "name": this.state.listenList[i].props.take.mode + ' ' + this.state.listenList[i].props.take.startv + ' (' +
                (playlist.length+1) + '/' + this.state.listenList.length + ')'
            }
        }

        return playlist

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

    buildListener() {

        if (this.state.listenList.length > 0) {
            return(

            <Accordion styled fluid>
                <Accordion.Title>
                    <Icon name="dropdown" />
                    Listen to Selected
                </Accordion.Title>

                <Accordion.Content>
                    <AudioComponent
                        playlist={this.createListenPlaylist()}
                    />
                </Accordion.Content>

            </Accordion>

            );
        }

    }

    requestData () {
        var query = QueryString.parse(this.props.location.search);

        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_project/', query
        ).then((results) => {
            this.setState(
                {
                    loaded: true,
                    segments: results.data,
                    mode:results.data[0].mode
                }
            )
        }).catch((exception) => {
            this.setState({error: exception});
        });

    }

    //if a child component does requests to change a take in the database, they have to
    //call this function to update the take in state.
    updateTakeInState (updatedTake) {
        var updatedSegments = this.state.segments.slice();
        var takeToUpdate = updatedSegments.findIndex(take => take.take.id === updatedTake.take.id);
        updatedSegments[takeToUpdate] = updatedTake;
        this.setState({segments: updatedSegments});
        console.log("SET STATE");
        console.dir(updatedSegments);
    }

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

    sort(arr) { // simple sort function
        return arr.sort(function(a, b) {
            return a - b
        })
    }

    createPlaylist() {

        var file = [];
        var length = 0;

        /////////
        file[0] = {
            "src": "a"
        }
        return file
        //////////

        for(let i = 0; i < this.state.segments.length; i++) {
            if (this.state.segments[i].take.is_export) {
                length += 1;
            }
        }

        for(let i = 0; i < this.state.segments.length; i++) {
            if (this.state.segments[i].take.is_export) {
                file[file.length] = {
                    "src": config.streamingUrl + this.state.segments[i].take.location,
                    "name": this.state.segments[i].take.mode + ' ' + this.state.segments[i].take.startv + ' ' + '(' + (file.length+1) + '/' + length + ')'
                }
            }
        }

        return file
    }

    createSourcePlaylist() {

        this.state.exportSource = false;
        var file = [];
        var src = '';

        //////////
        file[0] = {
            "src": "a",
            "name":"source"
        }
        return file
        //////////

        for(let i = 0; i < this.state.segments.length; i++) {

            if(this.state.segments[i].take.is_export) {
                if (!(this.state.segments[i].source === undefined)) {
                    this.state.exportSource = true;
                    file[file.length] = {
                        "src": config.streamingUrl + this.state.segments[i].source.take[0].location,
                        "name": this.state.segments[i].take.mode + ' ' + this.state.segments[i].take.startv + ' (src)'
                    }
                }
            }

        }

        return file
    }

    //if a child component deletes a take, they have to call this function to update our representation
    //of all the takes in state
    deleteTakeFromState(takeIdToDelete){
        var updatedSegments = this.state.segments.slice();
        var deleteIndex = updatedSegments.findIndex(take => take.take.id === takeIdToDelete);
        updatedSegments.splice(deleteIndex, 1);
        this.setState({segments: updatedSegments});
    }

    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    onClick = () => {// used when you click the microphone button in the player
        this.setState({
            open: true
        });
    }

    render () {
        var query = QueryString.parse(this.props.location.search);

        var tempArr = this.findStartVerses(this.state.segments); // find start verses

        tempArr = this.sort(tempArr); // sort by start verse
        tempArr = this.removeDuplicates(tempArr); // remove duplicates
        tempArr = this.createArray(tempArr, this.state.segments); // create array for ChunkList component

        var playlist = this.createPlaylist();
        var sourcePlaylist = this.createSourcePlaylist();

        return (
            <div>
                <h1>


                    Chapter {query.chapter}
                    {this.state.loaded
                        ? " (" + this.state.segments[0].book.name + ", " + this.state.segments[0].language.name + ")"
                        : ""
                    }
                    <Button
                        onClick={this.onClick}
                        color="red"
                        ref={audioComponent => { this.audioComponent = audioComponent; }}>
                        button
                    </Button>
                    {console.log(this.state.open)}
                    <CommentContainer
                        open={this.state.open}
                        ref={instance => (this.commentContainer = instance)}/>

                </h1>




                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={this.requestData.bind(this)}>
                    {tempArr.map(this.createChunkList.bind(this))}

                    <Accordion styled fluid>
                        <Accordion.Title>
                            <Icon name='dropdown' />
                            Listen to Export Takes
                        </Accordion.Title>

                        <Accordion.Content>

                            {this.state.exportSource
                                ? <Grid columns={1} relaxed>
                                    <Grid.Column width={4}>
                                        <Button onClick={(e) => this.handleClick(e)} content='Source Audio'
                                                icon='right arrow' labelPosition='right'/>
                                    </Grid.Column>

                                </Grid>

                                : ""
                            }


                            <Grid columns={2} relaxed>

                                <Grid.Column width={9}>
                                    <AudioComponent
                                        playlist={this.createPlaylist()}

                                    />

                                </Grid.Column>

                                {this.state.isToggleOn ? '' :

                                    <Grid.Column width={4}>

                                        <AudioComponent
                                            playlist={sourcePlaylist}
                                            width={200}

                                        />

                                    </Grid.Column>}

                            </Grid>

                        </Accordion.Content>

                    </Accordion>
                    <div>
                        {this.buildListener()}
                    </div>



                </LoadingDisplay>

            </div>
        );

    }

    createChunkList(arr) {

        return(
            <div>
                <ChunkList

                    segments={arr} // array of takes
                    mode={arr[0].take.mode}
                    number={arr[0].take.startv}
                    updateTakeInState={this.updateTakeInState.bind(this)}
                    addToListenList={this.addToListenList.bind(this)}
                    deleteTakeFromState={this.deleteTakeFromState.bind(this)}
                />
            </div>
        );

    }

}

export default ChapterContainer;