import React, { Component } from 'react';
import TakeList from './TakeList'
import {Table, Grid} from 'semantic-ui-react'
import 'css/takes.css'

var iterator;
class TakeTable extends Component {

    render () {

        return (
            <Grid.Column>
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                {this.props.icon}
                            </Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Cell>
                        <TakeList
                            takes={this.props.PLAYLIST}
                            addToListenList={this.props.addToListenList}
                            patchTake={this.props.patchTake}
                            deleteTake={this.props.deleteTake}
                            updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                            onClickSave={this.props.onClickSave}
                            ratingToGet={this.props.column}
                            playTake={this.props.playTake}
                            chunkNumber={this.props.chunkNumber}
                            mode={this.props.mode}
                            deleteComment={this.props.deleteComment}
                        />
                        <br />
                    </Table.Cell>
                </Table>
            </Grid.Column>

        );
    }


}

export default TakeTable;