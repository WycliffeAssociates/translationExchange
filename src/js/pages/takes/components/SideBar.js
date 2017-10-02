/**
 * Created by DennisMarchuk on 7/26/2017.
 */

import React, { Component } from 'react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import RecordButton from "./comments/RecordButton";
import SourceAudioButton from "./SourceAudioButton"
let state;
let toggleVisibility;


class ChunkSidebar extends Component {

    render() {
        return (
            <Menu vertical compact inverted>
                <Menu.Item>
                    <RecordButton
                        comments={this.props.comments}
                        onClickSave={this.props.onClickSave}
                        id={this.props.chunkId}
                        type={"chunk"}
                        deleteComment={this.props.deleteComment}
                        loadingActive={this.props.active}
                        number={this.props.chunkNumber}
                    />
                </Menu.Item>
                <Menu.Item>
                    <SourceAudioButton startv={this.props.chunkNumber}
                                       onSourceClicked={this.props.onSourceClicked}/>
                </Menu.Item>
            </Menu>
        )
    }
}

export default ChunkSidebar
