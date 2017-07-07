import React, {Component} from 'react';
import ChunkList from "./ChunkList";
import LoadingDisplay from "../../shared/LoadingDisplay.js";

// this is the page for one chapter
import axios from 'axios';
import config from '../../../config';

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
        //do a web request here for segments (chunks or verses) of chapter...
    //     var self = this;
    //     axios.get(config.apiUrl + 'takes')
    //         .then(function (response) {
    //             throw "mewy";
    //             console.dir(response.data[0]);
    //
    //             self.setState(
    //                 {
    //                     loaded: true,
    //                     retry: null,
    //                     segments: [
    //                         {
    //                             mode: "chunk",
    //                             number: 1,
    //                             sourceAudio: config.streamingUrl + response.data[0].location,
    //                             takes: [
    //                                 {
    //                                     id: 1,
    //                                     audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Iraqi.mp3",
    //                                     author: "Bob the Translator",
    //                                     rating: 3,
    //                                     timestamp: "26 June 2017 8:44 pm"
    //                                 },
    //                                 {
    //                                     id: 2,
    //                                     audioSource: "http://localhost:3001/files/Matthew_1_Arabic_VanDyke.mp3",
    //                                     author: "Alice the Translator",
    //                                     rating: 2,
    //                                     timestamp: "28 June 2017 10:07 am"
    //                                 },
    //                                 {
    //                                     id: 5,
    //                                     audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Sudanese.mp3",
    //                                     author: "Bob the Translator",
    //                                     rating: 3,
    //                                     timestamp: "28 June 2017 10:11 am"
    //                                 }
    //                             ]
    //                         },
    //                         {
    //                             mode: "chunk",
    //                             number: 3,
    //                             sourceAudio: "http://localhost:3001/files/Matthew_2_English.mp3",
    //                             takes: [
    //                                 {
    //                                     id: 8,
    //                                     audioSource: "http://localhost:3001/files/Matthew_2_Arabic_Iraqi.mp3",
    //                                     author: "Bob the Translator",
    //                                     rating: 1,
    //                                     timestamp: "June 3 2017 4:12 pm"
    //                                 },
    //                                 {
    //                                     id: 10,
    //                                     audioSource: "http://localhost:3001/files/Matthew_2_Arabic_VanDyke.mp3",
    //                                     author: "Alice the Translator",
    //                                     rating: 3,
    //                                     timestamp: "June 3 2017 4:22 pm"
    //                                 }
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             );
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             self.setState( {retry: self.requestData} );
    //             console.log(self.state.retry);
    //         });
    // }
    //
    // render () {
    //     console.log("retry: " + this.state.retry);
    //     return (
    //         <div>
    //             {/*Chapter {this.props.match.params.chid}*/}
    //             <LoadingDisplay loaded={this.state.loaded} retry={this.state.retry}>
    //                 <ChunkList
    //                     segments={this.state.segments}
    //                     mode={this.state.segments.mode}
    //                 />
    //             </LoadingDisplay>
        axios.get('http://172.19.145.91:8000/api/takes/', {
            params: {
                chapter: 6
            }
        }).then((results) => {

            this.setState(
                {
                    segments: results.data,
                    mode: results.data[0].mode
                }
            )
        });

    }

    // Creates array containing one instance of each start verse
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
    createChunkTakes(placeHolderArr) {
        var uniqueArray = this.findChunks(placeHolderArr)
        var finalArr = [];
        for(let i = 0; i < uniqueArray.length; i++) {
            var counter = 0
            var chunkArr = []

            for(let j = 0; j < placeHolderArr.length; j++) {
                if (placeHolderArr[j].startv === uniqueArray[i]) {
                    chunkArr[counter] = placeHolderArr[j]
                    counter += 1;
                }
            }
            finalArr[i] = chunkArr
        }

        return (
            finalArr
        );
    }

    createChunkList(arr) {
        return(
            <ChunkList
                segments={arr}
                mode={arr[0].mode}
                number={arr[0].startv}
            />
        );
    }

    render () {

        var segments = this.state.segments
        var finalArr = this.createChunkTakes(segments)

        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                {finalArr.map(this.createChunkList)}
            </div>
        );
    }
}

export default ChapterContainer;