import React, {Component} from 'react';
import ChunkPropTypes from "./ChunkPropTypes";

import {Accordion, Icon, Grid} from "semantic-ui-react";
import TakeTable from './TakeTable'
import 'css/takes.css'
import PinkButton from "./comments/PinkButton";
import SideBar from "./SideBar"
let onClick;
let CommentContainer


class Chunk extends Component {

    render () {

        var publish = [];
        var onestar = [];
        var twostar = [];
        var threestar = [];

        this.props.segments.map((i) => {


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

                        <SideBar className="commentBar"
                                 comments={this.props.comments}
                                 onClickSave={this.props.onClickSave}
                                 chunkId={this.props.id}
                                 deleteComment={this.props.deleteComment}
                                 chunkNumber={this.props.number}
                                 onSourceClicked={this.props.onSourceClicked}
                        >

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
                                />
                            </Grid>
                        </SideBar>
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

 <SideBar className="commentBar"/>

*/
 Chunk.propTypes = {
 chunk: ChunkPropTypes
 };


export default Chunk;