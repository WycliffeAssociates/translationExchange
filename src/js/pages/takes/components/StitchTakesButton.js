import React, { Component } from 'react'
import { Button, Icon, Container } from 'semantic-ui-react'
import 'css/takes.css'

class StitchTakesButton extends Component {
    render() {

        {/*<Button basic inverted icon color="black" toggle active={this.props.active} onClick={this.props.onClick}>
         <Icon name='plus' size='small' color="grey"/>
         </Button>*/}

        return (
                <Icon name="plus" size="large" color="grey" className="hoverButton" onClick={this.props.onClick} />
        )
    }
}

export default StitchTakesButton