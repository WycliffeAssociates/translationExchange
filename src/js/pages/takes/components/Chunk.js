import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Icon} from "semantic-ui-react";
import axios from 'axios';
import config from "config/config";
import _ from 'lodash';

class Chunk extends Component {
    constructor (props) {
        super(props);
        this.state = {open: false};
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
                        updateTakeInState={this.props.updateTakeInState}
                    />
                </Accordion.Content>
                </Accordion>
            </div>
        );
    }

}

// Chunk.propTypes = {
//     chunk: ChunkPropTypes
// };

export default Chunk;