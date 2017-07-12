/**
 * Created by DennisMarchuk on 7/12/2017.
 */

import React, { Component } from 'react'
import { Button, state, handleClick, Icon } from 'semantic-ui-react'

class ButtonToggle extends Component {
    state = {}

    handleClick = () => this.setState({ active: !this.state.active })

    render() {
        const { active } = this.state

        return (
            <Button icon toggle active={active} onClick={this.handleClick}>
                <Icon name='save' size='large'/>
            </Button>
        )
    }
}

export default ButtonToggle