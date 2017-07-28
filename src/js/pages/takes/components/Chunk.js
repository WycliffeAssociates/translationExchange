import React, {Component} from 'react';
import ChunkPropTypes from "./ChunkPropTypes";

import {Accordion, Icon, Grid, Menu, Rail} from "semantic-ui-react";
import TakeTable from './TakeTable'
import 'css/takes.css'

import ChunkSidebar from "./SideBar"
let onClick;
let CommentContainer


class Chunk extends Component {

    render () {

        var publish = [];
        var onestar = [];
        var twostar = [];
        var threestar = [];

        var counter = 0;

        let orderedSegments = this.props.segments.slice();

        orderedSegments.map((i) => {

            counter+= 1
            i.order= counter

            if (i.take.is_publish) {
                publish[publish.length] = i
            }

            else if(i.take.rating < 2) {
                onestar[onestar.length] = i
            }
            else if(i.take.rating === 2) {
                twostar[twostar.length] = i
            }
            else if(i.take.rating === 3) {
                   threestar[threestar.length] = i
            }

        })

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

        var icon1 = <Icon name="star" color="red" size="big"/>
        var icon2 =
            <div>
                <Icon name="star" color="yellow" size="big"/>
                <Icon name="star" color="yellow" size="big"/>
            </div>
        var icon3 =
            <div>
                <Icon name="star" color="green" size="big"/>
                <Icon name="star" color="green" size="big"/>
                <Icon name="star" color="green" size="big"/>
            </div>
        var icon4 = <Icon name="check" color="pink" size="big"/>


        return (

            <div>

                <Accordion fluid styled>
                    <Accordion.Title className="ChunkTitle">
                        <center>
                            <Icon name='dropdown' />
                            <font color="black">
                            {modeLabel} {this.props.number}
                            </font>
                        </center>

                    </Accordion.Title>
                    <Accordion.Content className="ChunkBody">

                        <Grid fluid columns={2}>
                            <Grid.Column width={15}>
                                <Grid fixed padded fluid columns={4}>
                                    <TakeTable
                                        icon={icon1}
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        column={0}
                                        PLAYLIST={onestar}
                                        playTake={this.props.playTake}
                                        chunkNumber={this.props.number}
                                        deleteComment={this.props.deleteComment}
                                        active={this.props.active}
                                    />
                                    <TakeTable
                                        icon={icon2}
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        column={1}
                                        PLAYLIST={twostar}
                                        playTake={this.props.playTake}
                                        chunkNumber={this.props.number}
                                        deleteComment={this.props.deleteComment}
                                        active={this.props.active}
                                    />
                                    <TakeTable
                                        icon={icon3}
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        column={2}
                                        PLAYLIST={threestar}
                                        playTake={this.props.playTake}
                                        chunkNumber={this.props.number}
                                        deleteComment={this.props.deleteComment}
                                        active={this.props.active}
                                    />
                                    <TakeTable
                                        icon={icon4}
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        column={3}
                                        PLAYLIST={publish}
                                        playTake={this.props.playTake}
                                        chunkNumber={this.props.number}
                                        deleteComment={this.props.deleteComment}
                                        active={this.props.active}
                                    />

                                </Grid>
                            </Grid.Column>
                            <Grid.Column width={1} verticalAlign="middle" floated="right">
                                <ChunkSidebar
                                    comments={this.props.comments}
                                    onClickSave={this.props.onClickSave}
                                    column={0}
                                    PLAYLIST={onestar}
                                    playTake={this.props.playTake}
                                    chunkNumber={this.props.number}
                                    mode={this.props.mode}
                                    chunkId={this.props.id}
                                    deleteComment={this.props.deleteComment}
                                    active={this.props.active}
                                    onSourceClicked={this.props.onSourceClicked}
                                />
                            </Grid.Column>
                        </Grid>

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