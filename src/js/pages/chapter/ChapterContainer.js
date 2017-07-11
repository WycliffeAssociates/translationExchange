import React, {Component} from 'react';
import ChunkList from "./ChunkList";
import LoadingDisplay from "../../shared/LoadingDisplay.js";
import axios from 'axios';
import config from '../../../config';

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
        this.setState({ error: "" });
        //FIXME: need to use get project API instead of takes list
        axios.get(config.apiUrl + 'takes/', {
            params: {
                chapter: this.props.match.params.chid
            }
        }).then((results) => {
            this.setState(
                {
                    loaded: true,
                    segments: results.data,
                    mode: results.data[0].mode
                }
            );
        }).catch((exception) => {
            this.setState({ error: exception });
        });

    }

    // Creates array containing one instance of each start verse
    findChunks(placeHolderArr) {
        var newArr = [];

        for (let i = 0; i < placeHolderArr.length; i++) {

            newArr[newArr.length] = placeHolderArr[i].startv;
        }

        var uniqueArray = newArr.filter(function(item, pos) {
            return newArr.indexOf(item) === pos;
        });

        return(
            uniqueArray
        );
    }


    // creates array containing each chunk and array of each take in that chunk
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
        var segments = this.state.segments;
        var finalArr = this.createChunkTakes(segments);

        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                <LoadingDisplay loaded={this.state.loaded}
                                retry={this.requestData.bind(this)}
                                error={this.state.error}>
                    {finalArr.map(this.createChunkList)}
                </LoadingDisplay>
            </div>
        );
    }
}

export default ChapterContainer;