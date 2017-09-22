import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import 'css/takes.css'

class StitchTakesButton extends Component {
    render() {



        return (
                <Icon name={this.props.icon} color="blue" size="large" className="hoverButton" onClick={this.props.onClick} />
        )
    }
}

export default StitchTakesButton;
