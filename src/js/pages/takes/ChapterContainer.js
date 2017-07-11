import React, {Component} from 'react';

import ChunkList from "./components/ChunkList";
import LoadingDisplay from "js/components/LoadingDisplay.js";
import axios from 'axios';
import config from 'config/config';

// this is the page for one chapter

class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {loaded: false, retry: null, segments: [], mode: "", source: "", takeList: []};
    }

    componentDidMount () {
        this.requestData();
    }

    requestData () {
        //var chapterID = this.props.match.params.chid;

        axios.post('http://172.19.145.91:8000/api/get_project/', {
            "language":"en-x-demo2",
            "version":"ulb",
            "book":"mrk",
            "chapter":6
        }).then((results) => {
            this.setState(
                {
                    segments: results.data,
                    mode:results.data[0].mode
                }
            )
        });

    }

    // Creates array containing one instance of each start verse
    // needs to be rewritten
    findChunks(placeHolderArr) {
        var newArr = [];

        for (let i = 0; i < placeHolderArr.length; i++) {

            newArr[newArr.length] = placeHolderArr[i].startv
        }

        var uniqueArray = newArr.filter(function(item, pos) {
            return newArr.indexOf(item) === pos;
        })

        return(
            uniqueArray
        );
    }


    // creates array containing each chunk and array of each take in that chunk
    // needs to be rewritten
    createChunkTakes(placeHolderArr) {
        var uniqueArray = this.findChunks(placeHolderArr);
        var finalArr = [];
        for(let i = 0; i < uniqueArray.length; i++) {
            var counter = 0;
            var chunkArr = [];

            for(let j = 0; j < placeHolderArr.length; j++) {
                if (placeHolderArr[j].startv === uniqueArray[i]) {
                    chunkArr[counter] = placeHolderArr[j];
                    counter += 1;
                }
            }
            finalArr[i] = chunkArr;
        }

        console.log('createChunkTakes() finished')
        return (
            finalArr
        );
    }



    render () {
        var segments = this.state.segments
        {console.log('segments', segments)} // returns array of 23 objects

        //var finalArr = this.createChunkTakes(segments)
        //console.log('finalArr', finalArr)

        // divide segments into array of arrays

        var tempArr = [];
        for (let i = 0; i < segments.length; i++) {
            tempArr[tempArr.length] = segments[i].take.startv

        }

        console.log('tempArr', tempArr) // returns array of 23 start verses (includes duplicates)

        //remove duplicates

        tempArr = tempArr.filter(function(item, pos) {
            return tempArr.indexOf(item) === pos;
        })

        console.log('tempArr2', tempArr) // returns array of 23 start verses (no duplicates)

        // iterate through unique array (tempArr) and replace start verse with takes that include that start verse

        for (let i = 0; i < tempArr.length; i++) {
            var int = tempArr[i];
            var placeHolderArr = [];
            for (let j = 0; j < segments.length; j++) {
                if (int === segments[j].take.startv) {
                    placeHolderArr[placeHolderArr.length] = segments[j]
                }
            }

            tempArr[i] = placeHolderArr
        }

        console.log('finalArr', tempArr) // returns array containing one array for ever start verse found (22)

        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                {tempArr.map(this.createChunkList)}

                {/*
                 {console.log('tempArr', tempArr[1])}
                 <ChunkList
                 segments={tempArr[1]}
                 mode={'chunk'}
                 number={5}
                 />
                 */}
            </div>
        );
    }

    createChunkList(arr) {
        //console.log('New ChunkList started...')

        /*
         console.log(arr)
         console.log('mode:', arr[0].take.mode)
         console.log('num:', arr[0].take.startv)
         */


        return(
            <div>

                <ChunkList
                    segments={arr} // array of takes
                    mode={arr[0].take.mode}
                    number={arr[0].take.startv}
                />
                {/*console.log('ChunkList finished')*/}

            </div>

        );

    }


}

export default ChapterContainer;