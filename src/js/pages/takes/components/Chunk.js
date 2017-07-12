import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Icon} from "semantic-ui-react";
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



        return (
            <div>
                <Accordion styled fluid>
                <Accordion.Title>
                    <Icon name='dropdown' />
                    {modeLabel} {this.props.number}
                </Accordion.Title>

                <Accordion.Content>
                    <TakeList
                    takes={this.props.segments}
                    />
                </Accordion.Content>
                </Accordion>
            </div>
        );
    }

}

Chunk.propTypes = {
    chunk: ChunkPropTypes
};

export default Chunk;