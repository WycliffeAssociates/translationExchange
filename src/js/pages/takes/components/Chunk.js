import React, {Component} from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";

import {Accordion, Button, Icon, Container, Grid, Table} from "semantic-ui-react";
import Footer from './Footer'
import TakeTable from './TakeTable'
import PinkButton from "./comments/PinkButton";
import SourceAudioButton from "./SourceAudioButton"
let onClick;


class Chunk extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    onClick = () => {// used when you click the microphone button in the player
        this.setState({
            modalopen: true
        });
    }

    createTakeTables() {

        var cells = [];

        for (var i = 0; i < 4; i++) {

            var name;
            var img;

            switch(i) {
                case 0:
                    name = "Garbage";
                    img = <Icon name="star" color="red" size="big"/>
                    break;
                case 1:
                    name = "2 stars";
                    img =
                        <div>
                            <Icon name="star" color="yellow" size="big"/>
                            <Icon name="star" color="yellow" size="big"/>
                        </div>
                    break;
                case 2:
                    name = "3 stars";
                    img =
                        <div>
                            <Icon name="star" color="green" size="big"/>
                            <Icon name="star" color="green" size="big"/>
                            <Icon name="star" color="green" size="big"/>
                        </div>
                    break;
                case 3:
                    name = "Check";
                    img = <Icon name="check" color="pink" size="big"/>
                    break;
            }

            cells[i] =

                <Grid.Column>

                    <Table textAlign="center">
                        <Table.Header>
                            <Table.Row>

                            <Table.HeaderCell>{img}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>


                                <Table.Cell>
                                    <TakeTable
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        column={i}
                                        // deleteComment={this.props.deleteComment}
                                    />
                                    <br />
                                </Table.Cell>


                    </Table>

                </Grid.Column>
        }

        return cells
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
                    <SourceAudioButton startv={this.props.number}
                                       onSourceClicked={this.props.onSourceClicked}/>

                        <Grid padded fluid columns={4}>
                            {this.createTakeTables()}
                        </Grid>



                    <Container fluid className="ChunkFooter">
                        <Footer loaded={this.props.loaded}
                                chapter={this.props.chapter}
                                book={this.props.book.name}
                                language={this.props.language.name}
                                chunks={this.props.chunks}
                                mode={this.props.mode}
                                listenList={this.props.listenList}
                        />
                    </Container>
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