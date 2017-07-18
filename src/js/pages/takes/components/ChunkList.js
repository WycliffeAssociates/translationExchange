import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {

    render () {

        return (
            <div>

                {
                <Chunk
                    segments={this.props.segments} // array of takes
                    mode={this.props.mode}
                    number={this.props.number}
                    updateTakeInState={this.props.updateTakeInState}
                    addToListenList={this.props.addToListenList}
                />
                }

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