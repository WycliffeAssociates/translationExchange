import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
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

        switch (this.props.mode) {
            case "chunk":
                modeLabel = "Chunk";
                break;
            case "verse":
                modeLabel = "Verse";
                break;
            default:
                modeLabel = "Segment";
        }

        {console.log('segments', this.props.segments)}
        return (
            <div>
                <Button onClick={this.toggle.bind(this)}>
                    {modeLabel} {this.props.number}
                </Button>
                <Panel collapsible expanded={this.state.open}>
                    <TakeList
                        takes={this.props.segments} // array of takes
                    />

                </Panel>

            </div>
        );
    }

}
/*
Chunk.propTypes = {
    chunk: ChunkPropTypes
};
*/
export default Chunk;