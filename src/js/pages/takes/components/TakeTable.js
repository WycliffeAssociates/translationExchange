import React, { Component } from 'react';
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";
import TakeList from './TakeList'
import {Table, Grid} from 'semantic-ui-react'

var iterator;
class TakeTable extends Component {

    constructor(props) {
        super(props);
        this.state = {rating: this.props.column}
    }

    render () {

        iterator = 0;
        return (
            <Grid.Column>
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{this.props.icon}</Table.HeaderCell>
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
                            ratingToGet={this.state.rating}
                            // deleteComment={this.props.deleteComment}
                        />
                        <br />
                    </Table.Cell>
                </Table>
            </Grid.Column>

        );
    }


}

export default TakeTable;