import React, {Component} from 'react';
import ChunkList from "./ChunkList";
import Chunk from './Chunk'
import { Button } from 'react-bootstrap'
import axios from 'axios'

// this is the page for one chapter
class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {segments: [], mode: "", source: "", takeList: []};
    }

    componentDidMount () {
        //var chapterID = this.props.match.params.chid;
        //do a web request here for segments (chunks or verses) of chapter...
        //this is just fake data for now


        axios.get('http://172.19.145.91:8000/api/takes/').then((results) => {

            this.setState(
                {
                    takeList: results.data
                }


            )
        })

        {/*}
        if (this.props.match.params.chid == 1) {
            this.setState(
                {
                    segments: [
                        {
                            mode: "chunk",
                            number: 1,
                            sourceAudio: "http://localhost:3001/files/Matthew_1_English.mp3",
                            takes: [
                                {
                                    id: 1,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Iraqi.mp3",
                                    author: "Bob the Translator",
                                    rating: 3,
                                    timestamp: "26 June 2017 8:44 pm"
                                },
                                {
                                    id: 2,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_VanDyke.mp3",
                                    author: "Alice the Translator",
                                    rating: 2,
                                    timestamp: "28 June 2017 10:07 am"
                                },
                                {
                                    id: 5,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Sudanese.mp3",
                                    author: "Bob the Translator",
                                    rating: 3,
                                    timestamp: "28 June 2017 10:11 am"
                                }
                            ]
                        },
                        {
                            mode: "chunk",
                            number: 3,
                            sourceAudio: "http://localhost:3001/files/Matthew_2_English.mp3",
                            takes: [
                                {
                                    id: 8,
                                    audioSource: "http://localhost:3001/files/Matthew_2_Arabic_Iraqi.mp3",
                                    author: "Bob the Translator",
                                    rating: 1,
                                    timestamp: "June 3 2017 4:12 pm"
                                },
                                {
                                    id: 10,
                                    audioSource: "http://localhost:3001/files/Matthew_2_Arabic_VanDyke.mp3",
                                    author: "Alice the Translator",
                                    rating: 3,
                                    timestamp: "June 3 2017 4:22 pm"
                                }
                            ]
                        }
                    ]
                }
            );
        } else {
            this.setState(
                {
                    segments: [
                        {
                            mode: "verse",
                            number: 1,
                            sourceAudio: "http://localhost:3001/files/Matthew_1_English.mp3",
                            takes: [
                                {
                                    id: 1,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Iraqi.mp3",
                                    author: "Bob the Translator",
                                    rating: 3,
                                    timestamp: "26 June 2017 8:44 pm"
                                },
                                {
                                    id: 2,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_VanDyke.mp3",
                                    author: "Alice the Translator",
                                    rating: 2,
                                    timestamp: "28 June 2017 10:07 am"
                                },
                                {
                                    id: 5,
                                    audioSource: "http://localhost:3001/files/Matthew_1_Arabic_Sudanese.mp3",
                                    author: "Bob the Translator",
                                    rating: 3,
                                    timestamp: "28 June 2017 10:11 am"
                                }
                            ]
                        },
                        {
                            mode: "verse",
                            number: 2,
                            sourceAudio: "http://localhost:3001/files/Matthew_2_English.mp3",
                            takes: [
                                {
                                    id: 8,
                                    audioSource: "http://localhost:3001/files/Matthew_2_Arabic_Iraqi.mp3",
                                    author: "Bob the Translator",
                                    rating: 1,
                                    timestamp: "June 3 2017 4:12 pm"
                                },
                                {
                                    id: 10,
                                    audioSource: "http://localhost:3001/files/Matthew_2_Arabic_VanDyke.mp3",
                                    author: "Alice the Translator",
                                    rating: 3,
                                    timestamp: "June 3 2017 4:22 pm"
                                }
                            ]
                        }
                    ]
                }
            );
        }
        */}
    }

    render () {

        return (
            <div>
                <h1>Chapter {this.props.match.params.chid}</h1>
                {/*
                <ChunkList
                    segments={this.state.segments}
                    mode={this.state.segments.mode}
                />
                */}


              <ChunkList
                segments={this.state.takeList}
                mode="chunk"
              />

            </div>
        );
    }
}

export default ChapterContainer;