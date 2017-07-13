import React, {Component} from 'react';

import ChunkList from "./components/ChunkList";
import axios from 'axios';
import config from "../../../config/config";
import LoadingDisplay from "../../components/LoadingDisplay";


// this is the page for one chapter

class ChapterContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {loaded: false, error: "", segments: [], mode: "", source: "", takeList: [], chapters: []
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
                    {tempArr.map(this.createChunkList.bind(this))}
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