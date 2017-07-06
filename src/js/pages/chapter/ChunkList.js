import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {
    render () {
        return (
            <div>
                {/*this.props.segments.map(this.createListItem.bind(this))*/}

                {/*console.log(this.props)*/}

                <Chunk
                    chunk={this.props}
                    number={1}
                />

                <Chunk
                    chunk={this.props}
                    number={2}
                />



            </div>
        );
    }

    createListItem (segment) {
        return (
            <div>
                <Chunk
                    chunk={this.props}
                />

            </div>
        );
    }
}

ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};

export default ChunkList;