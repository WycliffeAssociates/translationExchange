import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Button, Icon} from "semantic-ui-react";
import axios from 'axios';
import config from "config/config";
import _ from 'lodash';
import CommentContainer from "./comments/CommentContainer";

class Chunk extends Component {
    constructor (props) {
        super(props);
        this.state = {open: false};
    }

    onClick = () => {// used when you click the microphone button in the player
        this.setState({
            modalopen: true
        });
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
                        addToListenList={this.props.addToListenList}
                        patchTake={this.props.patchTake}
                        deleteTake={this.props.deleteTake}
                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    />
                </Accordion.Content>
                </Accordion>
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