import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {
    render () {
        return (
            <div>
                {this.props.segments.map(this.createListItem.bind(this))}
            </div>
        );
    }

    createListItem (segment) {
        return (
            <Chunk
                chunk={segment}
            />
        );
    }
}

ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};

export default ChunkList;