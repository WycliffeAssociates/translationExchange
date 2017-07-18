import React, {Component} from 'react';

import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";
import { Accordion, Icon, Grid, Button } from 'semantic-ui-react'
import AudioComponent from './components/AudioComponent'


// this is the page for one chapter

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {loaded: false, error: "", segments: [], mode: "", source: "", takeList: [], chapters: [], isToggleOn: true
        };
    }

    componentDidMount () {
        this.requestData();

    }


    requestData () {
        //var chapterID = this.props.match.params.chid;
        console.log('ChapterContainer props', this.props)
        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_project/', {
            "language":"en-x-demo2",
            "version":"ulb",
            "book":"mrk",
            "chapter":this.props.match.params.chid
        }).then((results) => {
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
        console.log("TAKE TO UPDATE:");
        console.dir(updatedTake);

        var updatedSegments = this.state.segments.slice();
        var takeToUpdate = updatedSegments.findIndex(take => take.take.id === updatedTake.take.id);
        updatedSegments[takeToUpdate] = updatedTake;
        this.setState({segments: updatedSegments});
        console.log("SET STATE");
        console.dir(updatedSegments);

        this.state.takeList = updatedSegments

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
        var file = [];
        var src = '';


        for(let i = 0; i < this.state.segments.length; i++) {

            if(this.state.segments[i].take.is_export) {
                if (!(this.state.segments[i].source === undefined)) {
                    file[file.length] = {
                        "src": config.streamingUrl + this.state.segments[i].source.take[0].location,
                        "name": this.state.segments[i].take.mode + ' ' + this.state.segments[i].take.startv + ' (src)'
                    }
                }

            }

        }

        return file
    }

    handleClick() {
        this.setState({isToggleOn: !this.state.isToggleOn});
    }

    render () {

        var tempArr = this.findStartVerses(this.state.segments); // find start verses

        tempArr = this.sort(tempArr); // sort by start verse
        tempArr = this.removeDuplicates(tempArr); // remove duplicates
        tempArr = this.createArray(tempArr, this.state.segments); // create array for ChunkList component

        var playlist = this.createPlaylist();
        var sourcePlaylist = this.createSourcePlaylist();


        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={this.requestData.bind(this)}>
                    {tempArr.map(this.createChunkList.bind(this))}

                    <Accordion styled fluid>
                        <Accordion.Title>
                            <Icon name='dropdown' />
                            Listen to Selected Takes
                        </Accordion.Title>

                        <Accordion.Content>

                            <Grid columns={1} relaxed>
                                <Grid.Column width={4}>
                                    <Button onClick={(e) => this.handleClick(e)} content='Source Audio' icon='right arrow' labelPosition='right' />
                                </Grid.Column>

                            </Grid>



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
                />

            </div>
        );

    }

}

export default ChapterContainer;