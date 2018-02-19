/**
 * Created by DennisMarchuk on 7/26/2017.
 */

import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import RecordButton from "./comments/RecordButton";
import SourceAudioButton from "./SourceAudioButton"
class ChunkSidebar extends Component {
    render() {

        return (
            <Menu vertical compact inverted>
                <Menu.Item>
                    <RecordButton
                        onClickSave={this.props.onClickSave}
                        id={this.props.chunkId}
                        type={"chunk"}
                        deleteComment={this.props.deleteComment}
                        loadingActive={this.props.active}
                        number={this.props.chunkNumber}
                        has_comments={this.props.has_comments}
                    />
                </Menu.Item>
                {this.props.published ?
                    <Menu.Item>
                        <SourceAudioButton chunkId={this.props.chunkId} chunkNumber={this.props.chunkNumber}
                            onSourceClicked={this.props.onSourceClicked} />
                    </Menu.Item>
                    : null
                }
            </Menu>
        )
    }
}

export default ChunkSidebar
