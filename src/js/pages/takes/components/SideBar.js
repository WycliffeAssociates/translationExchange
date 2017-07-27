/**
 * Created by DennisMarchuk on 7/26/2017.
 */

import React, { Component } from 'react'
import { Sidebar, Segment, Menu } from 'semantic-ui-react'
import PinkButton from "./comments/PinkButton";
import SourceAudioButton from "./SourceAudioButton"
let state;
let toggleVisibility;


class SidebarRightOverlay extends Component {
    state = { visible: true }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        width='thin'
                        direction='right'
                        visible={visible}
                        vertical
                        inverted
                    >

                        <Menu.Item>
                            <PinkButton
                                comments={this.props.comments}
                                onClickSave={this.props.onClickSave}
                                id={this.props.chunkId}
                                type={"chunk"}
                                deleteComment={this.props.deleteComment}/>
                        </Menu.Item>
                        <Menu.Item>
                            <SourceAudioButton startv={this.props.chunkNumber}
                                               onSourceClicked={this.props.onSourceClicked}/>
                        </Menu.Item>

                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            { this.props.children }
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default SidebarRightOverlay
