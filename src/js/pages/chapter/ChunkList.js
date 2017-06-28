import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {
    render () {
        return (
            <ul>
                {this.props.segments.map(this.createListItem.bind(this))}
            </ul>
        );
    }

    createListItem (segment) {
        return (
            <li>
                <Chunk
                    chunk={segment}
                />
            </li>
        );
    }
}

ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};

export default ChunkList;