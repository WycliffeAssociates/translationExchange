import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {

    render () {

        return (
            <div>

                {/*
                <Chunk
                    segments={this.props.segments} // array of takes
                    mode='chunkdfjdlkfjdl'
                    number={5}
                />
                */}

                <h5>Chunk</h5>


            </div>
        );
    }

}
/*
ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};
*/

export default ChunkList;