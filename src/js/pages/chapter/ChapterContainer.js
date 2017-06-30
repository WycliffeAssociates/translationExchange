import React, {Component} from 'react';
import ChunkList from "./ChunkList";

class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {segments: [], mode: "", source: ""};
    }

    componentDidMount () {
        {/*var chapterID = this.props.match.params.chid;*/}
        //do a web request here for segments (chunks or verses) of chapter...
        //this is just fake data for now
        this.setState(
            {
                segments: [
                    {
                        mode: "chunk",
                        number: 1,
                        sourceAudio: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
                        takes: [
                            {
                                id: 1,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            },
                            {
                                id: 2,
                                audioSource: "audiosource",
                                author: "Alice the Translator",
                                rating: 2,
                                timestamp: "timestamp"
                            },
                            {
                                id: 5,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            }
                        ]
                    },
                    {
                        mode: "chunk",
                        number: 3,
                        sourceAudio: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
                        takes: [
                            {
                                id: 8,
                                audioSource: "audiosource",
                                author: "Bob the Translator",
                                rating: 1,
                                timestamp: "timestamp"
                            },
                            {
                                id: 10,
                                audioSource: "https://files.freemusicarchive.org/music%2Fno_curator%2FThe_Womb%2FBang_-_An_Introduction_to_The_Womb%2FThe_Womb_-_02_-_Sex_Club.mp3",
                                author: "Alice the Translator",
                                rating: 3,
                                timestamp: "timestamp"
                            }
                        ]
                    }
                ]
            }
        );
    }

    render () {

        return (
            <div>
                {/*I'm a chapter container for {this.props.match.params.chid}!*/}
                <ChunkList
                    segments={this.state.segments}
                    mode={this.state.segments.mode}

                />
            </div>
        );
    }
}

export default ChapterContainer;