import React, {Component} from 'react';
import ChunkList from "./ChunkList";
import LoadingDisplay from "../../shared/LoadingDisplay.js";

// this is the page for one chapter
import axios from 'axios';
import config from '../../../config';

class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {loaded: false, retry: null, segments: [], mode: "", source: ""};
    }

    componentDidMount () {
        this.requestData();
    }

    requestData () {
        //var chapterID = this.props.match.params.chid;
        //do a web request here for segments (chunks or verses) of chapter...
        var self = this;
        axios.get(config.apiUrl + 'takes')
            .then(function (response) {
                throw "mewy";
                console.dir(response.data[0]);

                self.setState(
                    {
                        loaded: true,
                        retry: null,
                        segments: [
                            {
                                mode: "chunk",
                                number: 1,
                                sourceAudio: config.streamingUrl + response.data[0].location,
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
            })
            .catch(function (error) {
                console.log(error);
                self.setState( {retry: self.requestData} );
                console.log(self.state.retry);
            });
    }

    render () {
        console.log("retry: " + this.state.retry);
        return (
            <div>
                {/*Chapter {this.props.match.params.chid}*/}
                <LoadingDisplay loaded={this.state.loaded} retry={this.state.retry}>
                    <ChunkList
                        segments={this.state.segments}
                        mode={this.state.segments.mode}
                    />
                </LoadingDisplay>
            </div>
        );
    }
}

export default ChapterContainer;