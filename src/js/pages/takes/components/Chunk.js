import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Button, Icon, Container, Grid, Table} from "semantic-ui-react";
import CommentContainer from "./comments/CommentContainer";
import Footer from './Footer'
import TakeTable from './TakeTable'
let onClick;


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

        console.log('Chunk Props', this.props)

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
                    <CommentContainer />

                    <Container className="Four Tables">

                        <Table textAlign="center">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Garbage</Table.HeaderCell>
                                    <Table.HeaderCell>2 Stars</Table.HeaderCell>
                                    <Table.HeaderCell>3 Stars</Table.HeaderCell>
                                    <Table.HeaderCell>Check</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Row>
                                <Table.Cell>
                                    <TakeTable
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}

                                        // deleteComment={this.props.deleteComment}
                                    />
                                    <br />
                                </Table.Cell>
                                <Table.Cell>
                                    <TakeTable
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        // deleteComment={this.props.deleteComment}
                                    />
                                    <br />
                                </Table.Cell>
                                <Table.Cell>
                                    <TakeTable
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        // deleteComment={this.props.deleteComment}
                                    />
                                    <br />
                                </Table.Cell>
                                <Table.Cell>
                                    <TakeTable
                                        takes={this.props.segments}
                                        addToListenList={this.props.addToListenList}
                                        patchTake={this.props.patchTake}
                                        deleteTake={this.props.deleteTake}
                                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                                        onClickSave={this.props.onClickSave}
                                        // deleteComment={this.props.deleteComment}
                                    />
                                    <br />
                                </Table.Cell>
                            </Table.Row>

                        </Table>

                    </Container>



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