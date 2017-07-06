import React, { Component } from 'react';
import TakeList from "./takes/TakeList";
import TakeContainer from './takes/TakeContainer'
import ChunkPropTypes from "./ChunkPropTypes";
import AudioComponent from './takes/AudioComponent'
import { Button, Panel } from "react-bootstrap";

class Chunk extends Component {
    constructor (props) {
        super(props);
        this.state = {open: false};
    }

    toggle () {
        this.setState({ open: !this.state.open });
    }

    render () {
        var modeLabel = "";
        switch (this.props.chunk.mode) {
            case "chunk":
                modeLabel = "Chunk";
                break;
            case "verse":
                modeLabel = "Verse";
                break;
            default:
                modeLabel = "Segment";
        }
        return (
            <div>
                <Button onClick={this.toggle.bind(this)}>
                    {modeLabel} {this.props.chunk.number}
                </Button>


                <Panel collapsible expanded={this.state.open}>
                    <TakeList
                        takes={this.props./*takes*/chunk.segments}
                    />

                </Panel>

            </div>
        );
    }

}

Chunk.propTypes = {
    chunk: ChunkPropTypes
};

export default Chunk;
