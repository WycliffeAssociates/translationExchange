import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {
    render () {
        return (
            <div>

                <Chunk
                    chunk={this.props}
                    number={this.props.number}
                />


            </div>
        );
    }

}

ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};

export default ChunkList;