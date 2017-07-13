/**
 * Created by DennisMarchuk on 7/12/2017.
 */

import React, { Component } from 'react'
import { Button, state, handleClick, Icon } from 'semantic-ui-react'

class ButtonToggle extends Component {
    render() {
        return (
            <Button icon toggle active={this.props.active} onClick={this.props.onClick}>
                <Icon name='save' size='large'/>
            </Button>
        )
    }
}

export default ButtonToggle