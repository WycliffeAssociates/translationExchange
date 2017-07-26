/**
 * Created by DennisMarchuk on 7/12/2017.
 */

import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

class ButtonToggle extends Component {
    render() {
        return (
            <Button icon color={this.props.color} toggle active={this.props.active} onClick={this.props.onClick}>
                <Icon name='play' size='large'/>
            </Button>
        )
    }
}

export default ButtonToggle