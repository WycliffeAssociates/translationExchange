import React, {Component} from 'react';
import ChunkPropTypes from "./ChunkPropTypes";

import {Accordion, Button, Icon, Container, Grid, Table} from "semantic-ui-react";
import Footer from './Footer'
import TakeTable from './TakeTable'
import SideBar from './SideBar'
import 'css/takes.css'
import PinkButton from "./comments/PinkButton";
import SourceAudioButton from "./SourceAudioButton"
let onClick;
let CommentContainer


class Chunk extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, segments: this.props.segments};
    }

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
                        <PinkButton
                            comments={this.props.comments}
                            onClickSave={this.props.onClickSave}
                            id={this.props.id}
                            type={"chunk"}
                            deleteComment={this.props.deleteComment}/>

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
                            />
                        </Grid>
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