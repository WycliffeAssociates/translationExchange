import React, {Component} from 'react';

import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from 'config/config';
import LoadingDisplay from "../../components/LoadingDisplay";

// this is the page for one chapter

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {loaded: false, error: "", segments: [], mode: "", source: "", takeList: []};
    }

    componentDidMount () {
        this.requestData();
    }

    requestData () {
        //var chapterID = this.props.match.params.chid;
        this.setState({error: ""});
        axios.post(config.apiUrl + 'get_project/', {
            "language":"en-x-demo2",
            "version":"ulb",
            "book":"mrk",
            "chapter":6
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

    render () {

        var tempArr = this.findStartVerses(this.state.segments) // find start verses

        tempArr = this.sort(tempArr) // sort by start verse
        tempArr = this.removeDuplicates(tempArr) // remove duplicates
        tempArr = this.createArray(tempArr, this.state.segments) // create array for ChunkList component

        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                <LoadingDisplay loaded={this.state.loaded}
                                error={this.state.error}
                                retry={this.requestData.bind(this)}>
                    {tempArr.map(this.createChunkList)}
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
                />

            </div>
        );

    }

}

export default ChapterContainer;