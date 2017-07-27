/**
 * Created by DennisMarchuk on 7/26/2017.
 */

import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
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
                        icon='labeled'
                        vertical
                        inverted
                    >
                        <Menu.Item name='home'>
                            <Icon name='commenting outline' />
                            Comment
                        </Menu.Item>
                        <Menu.Item name='listen'>
                            <Icon name='assistive listening systems' />
                            Listen
                        </Menu.Item>

                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h1'>Application Content</Header>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default SidebarRightOverlay
