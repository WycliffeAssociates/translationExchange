import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeList from "./takes/TakeList";
import ChunkPropTypes from "./ChunkPropTypes";

class Chunk extends Component {
    render () {
        return (
            <div>
                Displaying {this.props.chunk.mode} {this.props.chunk.number}
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
