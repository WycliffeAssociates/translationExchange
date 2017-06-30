import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeList from "./takes/TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import AudioComponent from './takes/AudioComponent'

class Chunk extends Component {
    render () {
        return (
            <div>
                Displaying {this.props.chunk.mode} {this.props.chunk.number} <br />
                <strong>Source Audio for {this.props.chunk.mode} {this.props.chunk.number}</strong>
                <AudioComponent name="Source Audio" src={this.props.chunk.sourceAudio} />
                <br />
                <br />
                <TakeList
                    takes={this.props.chunk.takes}
                />
            </div>
        );
    }

}

Chunk.propTypes = {
    chunk: ChunkPropTypes
};

export default Chunk;
