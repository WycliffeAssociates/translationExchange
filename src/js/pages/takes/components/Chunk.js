import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Button, Icon} from "semantic-ui-react";
import axios from 'axios';
import config from "config/config";
import _ from 'lodash';
import CommentContainer from "./comments/CommentContainer";
let onClick;


class Chunk extends Component {
    constructor (props) {
        super(props);
        this.state = {open: false,
        modalopen:false};
    }

    //when takeId is marked as the one to export, update all other chunks
    //in the take so that they are NOT marked as ones to export
    updateTakeToExport (markedTakeId) {
        for (var i = 0; i < this.props.segments.length; i++) {
            var take = this.props.segments[i];

            //if a take is marked for export other than the just-marked one...
            if ((take.take.is_export) && (take.take.id !== markedTakeId)) {
                console.log("marking as not to export");
                //send a request to update it as not marked for export
                axios.patch(config.apiUrl + 'takes/' + take.take.id + '/', {
                    "is_export": false
                }).then((results) => {
                    console.log("marked in database");
                    var updatedTake = _.cloneDeep(take);
                    updatedTake.take = results.data;
                    this.props.updateTakeInState(updatedTake);
                });
            }
        }
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
                    <Button
                        onClick={this.onClick}
                        color="pink"
                        floated='right'
                        ref={audioComponent => { this.audioComponent = audioComponent; }}
                        icon="microphone"/>

                    <CommentContainer
                        open={this.state.modalopen}
                        ref={instance => (this.commentContainer = instance)}/>


                    <TakeList
                        takes={this.props.segments}
                        deleteTakeFromState={this.props.deleteTakeFromState}
                        updateTakeToExport={this.updateTakeToExport.bind(this)}
                        updateTakeInState={this.props.updateTakeInState}
                        addToListenList={this.props.addToListenList}
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