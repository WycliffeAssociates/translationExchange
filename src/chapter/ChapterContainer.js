import React, {Component} from 'react';
import ChunkList from "./ChunkList";

class ChapterContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {segments: [], mode: ""};
    }

    componentDidMount () {
        var chunkID = this.props.match.params.chid;
        //do a web request here for segments (chunks or verses) of chapter...
        this.setState(
            {
                segments: [
                    {
                        id: 1,
                        number: 1,
                        takes: [{}, {}, {}]
                    },
                    {
                        id: 2,
                        number: 3,
                        takes: [{}, {}]
                    }
                ],
                mode: "chunk"
            }
        );
    }

    render () {
        return (
            <div>
                I'm a chapter container for {this.props.match.params.chid}!
                <ChunkList
                    segments={this.state.segments}
                    mode={this.state.mode}
                />
            </div>
        );
    }
}

export default ChapterContainer;